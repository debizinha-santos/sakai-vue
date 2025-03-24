<script setup>
import { useLayout } from '@/layout/composables/layout';
import axios from 'axios';
import { defineProps, onMounted, ref, watch } from 'vue';

const props = defineProps({
    total: {
        type: Array,
        required: true
    }
});

const { getPrimary, getSurface, isDarkTheme } = useLayout();
const abrirRetiradaDialog = ref(false);
const chartData = ref(null);
const chartOptions = ref(null);
const myChart = ref(null);
const dadosRetirada = ref([]);
const clienteSelecionado = ref({ id_cliente: 0, dia: '', nome: '' });
const totalRetiradas = ref(0); // Total dinâmico de retiradas
const selectAll = ref(true); // Estado inicial: selecionar todos

// Função para alternar a seleção de todos os legends
const toggleAllLegends = () => {
    const chart = myChart.value.chart;

    if (selectAll.value) {
        // Desseleciona todos os legends
        chart.data.datasets.forEach((_, index) => {
            if (chart.isDatasetVisible(index)) {
                chart.hide(index);
            }
        });
    } else {
        // Seleciona todos os legends
        chart.data.datasets.forEach((_, index) => {
            if (!chart.isDatasetVisible(index)) {
                chart.show(index);
            }
        });
    }

    // Atualiza o total de retiradas com base nos datasets visíveis
    totalRetiradas.value = chart.data.datasets.reduce((sum, dataset, index) => {
        if (chart.isDatasetVisible(index)) {
            return sum + dataset.data.reduce((a, b) => a + b, 0);
        }
        return sum;
    }, 0);

    // Alterna o estado do botão
    selectAll.value = !selectAll.value;
};

// Função para gerar cores dinâmicas
const generateColors = (count) => {
    const colors = [];
    const step = Math.floor(360 / count);

    for (let i = 0; i < count; i++) {
        const hue = i * step;
        const saturation = 70;
        const lightness = 50;
        const transparent = 0.2;

        const color = `hsl(${hue}, ${saturation}%, ${lightness}%, ${transparent})`;
        colors.push(color);
    }

    return colors;
};

async function getDados(clienteSelecionado) {
    console.log(clienteSelecionado);
    const response = await axios.post('/api/retiradas', {
        data: {
            id_cliente: clienteSelecionado.value.id_cliente,
            dia: clienteSelecionado.value.dia,
            nome: clienteSelecionado.value.nome
        }
    });
    return response.data;
}

const setChartData = () => {
    const dataCount = props.total.length;
    const backgroundColors = generateColors(dataCount);
    const borderColors = backgroundColors.map((color) => color.replace('0.2', '1'));
    let diasx = props.total[0].dias.map((data) => data.split('-')[0]);

    const datasets = props.total.map((item, index) => ({
        label: item.label,
        data: item.data,
        id_cliente: item.id_cliente,
        backgroundColor: backgroundColors[index],
        borderColor: borderColors[index],
        borderWidth: 1
    }));

    // Calcula o total inicial de retiradas
    totalRetiradas.value = datasets.reduce((sum, dataset) => {
        return sum + dataset.data.reduce((a, b) => a + b, 0);
    }, 0);

    return {
        labels: diasx ? diasx : [],
        datasets: datasets
    };
};

function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,

        onClick: async (event, activeElements) => {
            const chart = myChart.value.chart;
            const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

            if (elements && elements.length) {
                const element = elements[0];
                const datasetIndex = element.datasetIndex;
                const dataIndex = element.index;

                const dataset = chart.data.datasets[datasetIndex];
                clienteSelecionado.value.dia = chart.data.labels[dataIndex];
                clienteSelecionado.value.id_cliente = dataset.id_cliente;
                clienteSelecionado.value.nome = dataset.label;
                dadosRetirada.value = await getDados(clienteSelecionado);
                abrirRetiradaDialog.value = true;
            }
        },

        plugins: {
            legend: {
                onClick: (e, legendItem, legend) => {
                    const chart = legend.chart;
                    const datasetIndex = legendItem.datasetIndex;

                    // Alterna a visibilidade do dataset
                    chart.isDatasetVisible(datasetIndex) ? chart.hide(datasetIndex) : chart.show(datasetIndex);

                    // Recalcula o total de retiradas com base nos datasets visíveis
                    totalRetiradas.value = chart.data.datasets.reduce((sum, dataset, index) => {
                        if (chart.isDatasetVisible(index)) {
                            return sum + dataset.data.reduce((a, b) => a + b, 0);
                        }
                        return sum;
                    }, 0);
                }
            }
        },

        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: 'transparent',
                    borderColor: 'transparent'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: borderColor,
                    borderColor: 'transparent',
                    drawTicks: false
                }
            }
        }
    };
}

watch([getPrimary, getSurface, isDarkTheme], () => {
    const newChartData = setChartData();
    chartData.value.labels = newChartData.labels;
    chartData.value.datasets = newChartData.datasets;
    chartOptions.value = setChartOptions();
});

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>

<template>
    <div class="card" style="">
        <div class="flex justify-between items-center">
            <div class="text-xl font-semibold">
                <span>
                    Ranking de Retiradas do Mês
                    <hr class="mb-0 mt-0" />
                </span>
            </div>
            <Button class="" :label="selectAll ? 'Selecionar Todos' : 'Desselecionar Todos'" icon="pi pi-check" size="small" style @click="toggleAllLegends" />
        </div>

        <Chart ref="myChart" type="bar" :data="chartData" :options="chartOptions" class="h-60" />

        <Dialog v-model:visible="abrirRetiradaDialog" maximizable modal :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <div class="header" style="display: flex; justify-content: space-between; align-items: center">
                    <!-- Título do cliente -->
                    <div class="title mb-0" style="display: flex; align-items: center">
                        <h5 style="margin-right: 5px">{{ clienteSelecionado.nome }}</h5>
                        <i v-tooltip="'Retiradas realizadas no dia selecionado'" class="mt-1 pi pi-info-circle" style="cursor: pointer; font-size: 1.2em; color: gray"></i>
                    </div>
                </div>
            </template>
            <template  v-if="clienteSelecionado?.value?.id_cliente >= 75">
                <DataTable class="mt-0" :value="dadosRetirada" paginator :rows="15" :rowsPerPageOptions="[5, 10, 20, 50]">
                    <column field="ID_DM" header="DM"></column>
                    <column field="nome" header="Itens"></column>
                    <column field="Quantidade" header="Quant." style="text-align: center"></column>
                    <column field="ID_Funcionario" header="Func."></column>
                    <column field="matricula" header="Matricula"></column>
                    <column #empty>
                        <div class="p-4 text-center">
                            <span class="p-text-secondary">Não há dados a serem exibidos</span>
                        </div>
                    </column>
                </DataTable>
            </template>

            <template v-else>
                <DataTable class="mt-0" :value="dadosRetirada" paginator :rows="15" :rowsPerPageOptions="[5, 10, 20, 50]">
                    <column field="id_vm" header="DM"></column>
                    <column field="produtonome" header="Itens"></column>
                    <column field="quantidade" header="Quant." style="text-align: center"></column>
                    <column field="nome_comprador" header="Nome Func."></column>
                    <column field="cartao_comprador" header="Matricula"></column>
                    <column #empty>
                        <div class="p-4 text-center">
                            <span class="p-text-secondary">Não há dados a serem exibidos</span>
                        </div>
                    </column>
                </DataTable>
            </template>
        </Dialog>

        <div class="flex justify-end">
            <div class="text-sm mb-4 mt-4 border"><span class="font-bold">Total de Retiradas:</span> {{ totalRetiradas }}</div>
        </div>
    </div>
</template>
