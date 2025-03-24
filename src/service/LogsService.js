export const LogsService = {
    getTreeLogsData() {
        return [
            {
                Dia: "2025-03-14 11:36:02",
                ID: 23512,
                ID_Cliente: 76,
                ID_Usuario: 1,
                Operacao: "SELECT",
                Log_Web: "Usuário undefined criou um novo Relatório de Estoque Baixo",
                Log_String: `
                    SELECT sku, nome, quantidade, quantidademinima 
                    FROM DM_Itens 
                    WHERE id_cliente = 76 
                    AND quantidade >= quantidademinima
                    AND quantidade <= quantidademinima + 2
                    AND quantidademinima > 0
                    AND deleted = 0
                `,
                Resultado: "sucesso"
            },
            {
                Dia: "2025-03-14 10:58:42",
                ID: 23511,
                ID_Cliente: 76,
                ID_Usuario: 1,
                Operacao: "SELECT",
                Log_Web: "Usuário undefined criou um novo Relatório de Estoque Baixo",
                Log_String: `
                    SELECT sku, nome, quantidade, quantidademinima 
                    FROM DM_Itens 
                    WHERE id_cliente = 76 
                    AND quantidade >= quantidademinima
                    AND quantidade <= quantidademinima + 2
                    AND quantidademinima > 0
                    AND deleted = 0
                `,
                Resultado: "sucesso"
            },
            {
                Dia: "2025-03-14 10:57:37",
                ID: 23510,
                ID_Cliente: 76,
                ID_Usuario: 1,
                Operacao: "SELECT",
                Log_Web: "Usuário undefined criou um novo Relatório de Estoque Baixo",
                Log_String: `
                    SELECT sku, nome, quantidade, quantidademinima 
                    FROM DM_Itens 
                    WHERE id_cliente = 76 
                    AND quantidade >= quantidademinima
                    AND quantidade <= quantidademinima + 2
                    AND quantidademinima > 0
                    AND deleted = 0
                `,
                Resultado: "sucesso"
            },
            {
                Dia: "2025-03-14 10:13:51",
                ID: 23509,
                ID_Cliente: 76,
                ID_Usuario: 1,
                Operacao: "SELECT",
                Log_Web: "Usuário undefined criou um novo Relatório de Estoque Baixo",
                Log_String: `
                    SELECT sku, nome, quantidade, quantidademinima 
                    FROM DM_Itens 
                    WHERE id_cliente = 76 
                    AND quantidade >= quantidademinima
                    AND quantidade <= quantidademinima + 2
                    AND quantidademinima > 0
                    AND deleted = 0
                `,
                Resultado: "sucesso"
            },
            {
                Dia: "2025-03-13 22:42:30",
                ID: 23508,
                ID_Cliente: 78,
                ID_Usuario: 1,
                Operacao: "SELECT",
                Log_Web: "Usuário undefined criou um novo Relatório de Estoque Baixo",
                Log_String: `
                    SELECT sku, nome, quantidade, quantidademinima 
                    FROM DM_Itens 
                    WHERE id_cliente = 78 
                    AND quantidade >= quantidademinima
                    AND quantidade <= quantidademinima + 2
                    AND quantidademinima > 0
                    AND deleted = 0
                `,
                Resultado: "sucesso"
            },
            {
                Dia: "2025-03-12 19:05:33",
                ID: 23507,
                ID_Cliente: 101,
                ID_Usuario: 1,
                Operacao: "SELECT",
                Log_Web: "Usuário undefined criou um Relatório dos Top 5 Itens com Menor Estoque",
                Log_String: `
                    SELECT TOP 5 sku, nome, quantidade, quantidademinima 
                    FROM DM_Itens 
                    WHERE id_cliente = 101
                    AND deleted = 0
                    ORDER BY quantidade ASC
                `,
                Resultado: "sucesso"
            },
            {
                Dia: "2025-03-12 18:51:49",
                ID: 23506,
                ID_Cliente: 101,
                ID_Usuario: 1189,
                Operacao: "DELETE",
                Log_Web: "O usuário 1189 deletou o serviço 2 para o cliente 101",
                Log_String: `
                    UPDATE Notificacoes_Servicos 
                    SET deleted = 1 
                    WHERE id_cliente = 101 
                    AND id_servico = 2
                `,
                Resultado: "sucesso"
            },
            {
                Dia: "2025-03-12 18:31:51",
                ID: 23504,
                ID_Cliente: 76,
                ID_Usuario: 1,
                Operacao: "SELECT",
                Log_Web: "Usuário undefined criou um novo Relatório de Estoque Baixo",
                Log_String: `
                    SELECT sku, nome, quantidade, quantidademinima 
                    FROM DM_Itens 
                    WHERE id_cliente = 76 
                    AND quantidade >= quantidademinima
                    AND quantidade <= quantidademinima + 2
                    AND quantidademinima > 0
                    AND deleted = 0
                `,
                Resultado: "sucesso"
            } 
        ];
    },

    getTreeTableNodes() {
        return Promise.resolve(this.getTreeTableNodesData());
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }
};
