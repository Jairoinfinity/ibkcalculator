$("#btnCalcular").click(function () {
    var divisa = $("#divisa").val();
    var cantidadCuenta = $("#cantidad").val();
    var riesgo = $("#riesgo").val();
    var lotes = $("#contratos").val();
    var perdidaEuros, ticks, valorTickEur;

    if (divisa == "USD") {
        perdidaEuros = (cantidadCuenta * riesgo) / 100;
        ticks = parseInt(((perdidaEuros / 6.25) / lotes) - 1);
        $("#lbelPerdida").html("Perdida máxima: " + perdidaEuros + "€");
        $("#lbelTicks").html("Stop Loss máximo: " + ticks + " Ticks");
    } else {
        amount = '6.25';

        $.ajax({
            url: 'http://api.exchangeratesapi.io/v1/latest?access_key=b92a115efc8770f560d1dcd2170e1652&format=1',
            dataType: 'jsonp',
            success: function (json) {
                valorTickEur = (amount / json.rates.USD);

                perdidaEuros = (cantidadCuenta * riesgo) / 100;
                ticks = parseInt(((perdidaEuros / valorTickEur) / lotes) - 1);
                $("#lbelPerdida").html("Perdida máxima: " + perdidaEuros + "€");
                $("#lbelTicks").html("Stop Loss máximo: " + ticks + " Ticks");
            }
        });
    }
});