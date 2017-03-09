
$(document).ready(function () {



    var $dates = $("input[type=date]");
    $dates.each(function () {
        var thisDate = $(this);
        thisDate.attr("type","text");
        thisDate.datepicker({
            minDate: thisDate.attr("min"),
            maxDate: thisDate.attr("max"),
            dateFormat: "yymmdd"
        });
    });



    var resultList = $("#resultList");

    $("#consultaLogsAuditoria").on("submit", function () {

        var consultaLog = "http://localhost:8080/auditoria/log/creados";

        var datos = $(this).serializeFormJSON();

        var datosConsulta = JSON.stringify(datos);

        $.ajax({
            url: consultaLog,
            data: datosConsulta,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3d3dy51c2FpZC5nb3YvIiwic3ViIjoidXN1YXJpb19hdWRpdG9yaWEiLCJleHAiOjE1NzUyMjUyODEsImlhdCI6MTQ4ODgyNTI4MX0.uZ8arvr4e1n51CtwciOdzkCNpcyYjF2a2J64ixPp0yA"
            },
            success: function (json) {
                displayResults(json);
            },
            error: function (xhr, status, error) {
                resultList.text("Error en la consulta");
                alert('Fallido: ' + error);
            }
        });
        return false;
    });

    function displayResults(results) {
        resultList.empty();
        $.each(results.items, function (i, item) {

            var newResult = $("<div class='result'>" +
                "<div>Entidad Emisora: " + item.entidadEmisora + "</div>" +
                "<div>Entidad Receptora: " + item.entidadReceptora + "</div>" +
                "<div>Fecha: " + item.fecha + "</div>" +
                "</div>");

            $(newResult).css("border", "solid 1px lightblue");

            $(newResult).on("click", function () {
                $(this).toggle(500);
            })
            newResult.hover(function () {
                // make it darker
                $(this).css("background-color", "lightblue");

            }, function () {
                // reverse
                $(this).css("background-color", "transparent");
            });

            resultList.append(newResult);

        });
    }

    (function ($) {
        $.fn.serializeFormJSON = function () {

            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
    })(jQuery);

})

