class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
        };

        this.formasDePagamento = {
            dinheiro: 0.95,
            debito: 1,
            credito: 1.03,
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento[formaDePagamento]) {
            return "Forma de pagamento inválida!";
        }

        const pedido = {};
        let total = 0;

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(",");
            const item = this.cardapio[codigo];
            if (!item) {
                return "Item inválido!";
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            if ((codigo === "chantily" || codigo === "queijo") && !pedido[codigo]) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (!pedido[codigo]) {
                pedido[codigo] = 0;
            }
            pedido[codigo] += parseInt(quantidade);
        }

        for (const codigo in pedido) {
            total += this.cardapio[codigo].valor * pedido[codigo];
        }

        if (formaDePagamento === "dinheiro") {
            total *= this.formasDePagamento.dinheiro;
        } else if (formaDePagamento === "credito") {
            total *= this.formasDePagamento.credito;
        }

        if (Object.keys(pedido).length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}

export { CaixaDaLanchonete };