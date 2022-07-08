var resultado = "0";
var operacoes = [];

// Funções

const mostrarResultado = (resultado) => {
    $(".caixa .resultado").html(Number(resultado));
}

const adicionarHistorico = (resultado) => {
    let historico = $(".historico .template-linha").clone();

    $(".nome", historico).html(resultado.usuario);
    $(".formula", historico).html(resultado.formula);
    $(".resultado", historico).html(resultado.resultado);

    historico.removeClass("template-linha");
    historico.prependTo(".historico")
}

const abrirCalculadora = (usuario) => {
    $(".nome-logado").html(usuario.nome);  
    $(".nome-logado").attr("data-id", usuario.id);

    $(".acesso").addClass("hidden");
    $(".calculadora").removeClass("hidden");
}

const limparCampos = () => {
    resultado = "0";
    operacoes = [];
    mostrarResultado(resultado);
}

const atualizarResultado = (digito) => {
    if(resultado === null) {
        resultado = 0;
    }

    resultado += digito;
    mostrarResultado(resultado);
}

const ajustarFecharParenteses = () => {
    if(resultado !== null){
        if(operacoes[operacoes.length - 1] === ")") {
            operacoes.push("*");
        }
        operacoes.push(resultado);
    }
}

const ajustarAbrirParenteses = () => {
    if(resultado !== null && operacoes.length > 0){
        operacoes.push(resultado);
        operacoes.push("*");
    } 
}

const adicionarOperador = (operador) => {
    operacoes.push(operador);
    resultado = null;
}

const obterUsuarioLogado = () => {
    let spanUsuario = $(".nome-logado");

    return { 
        id: spanUsuario.attr("data-id"),
        nome: spanUsuario.html()
    };
}

const usuarioValido = (nome) => nome !== "";

const tamanhoResultadoValido = () => resultado === null || resultado.length < 8;

const resultadoDecimalValido = (virgula) => !isNaN(resultado + virgula);

const buscarHistorico = () => {
    $.ajax({
        url: "/api/historico",
        method: "GET",
        error: function () {
            alert("Problema na consulta do histórico");
        },
        success: function(historico) {
            historico.forEach((v) => {
                adicionarHistorico(v);
            })
        }
    });
}

const acessar = (nomeUsuario) => {
    $.ajax({
        url: "/api/acessar",
        method: "POST",
        data: { nome: nomeUsuario },
        success: function(result) {
            abrirCalculadora(result);
        }
    });
}

const calcular = (usuario) => {
    $.ajax({
        url: "/api/calcular",
        method: "POST",
        data: {
            operacoes: operacoes,
            usuario: usuario
        },
        error: function () {
            alert("Problema na execução")
        },
        success: function( result ) {
            mostrarResultado(result.resultado);
            adicionarHistorico(result);
            operacoes = [];
        }
    });
}

$(function() {

    buscarHistorico();

    mostrarResultado(resultado);

    //Registro dos Eventos

    $("#acessar").on("click", () => {
        let inputUsuario = $("#input-usuario");
        let nome = inputUsuario.val();

        if(!usuarioValido(nome)){
            inputUsuario.addClass("is-invalid");
            return;
        }
            
        acessar(nome);
    })

    $(".botao-numerico").on("click", (event) => {
        if(!tamanhoResultadoValido())
            return;

        atualizarResultado(event.currentTarget.innerHTML);
    })

    $(".botao-virgula").on("click", (event) => {
        if(!resultadoDecimalValido(event.currentTarget.innerHTML))
            return;

        atualizarResultado(event.currentTarget.innerHTML);
    })

    $(".botao-limpar").on("click", (event) => {
        limparCampos();
    })

    $(".botao-operador").on("click", (event) => {
        ajustarFecharParenteses();

        adicionarOperador(event.currentTarget.innerHTML);
    });
    
    $(".botao-abrir-parenteses").on("click", (event) => {
        ajustarAbrirParenteses();

        adicionarOperador(event.currentTarget.innerHTML);
    });

    $(".botao-fechar-parenteses").on("click", (event) => {
        if(resultado !== null){
            operacoes.push(resultado);
        }

        adicionarOperador(event.currentTarget.innerHTML);
    });

    $(".botao-calculo").on("click", (event) => {
        ajustarFecharParenteses();

        if(operacoes.length <= 0) {
            return;
        }

        calcular(obterUsuarioLogado());
    })
});

