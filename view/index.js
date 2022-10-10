$(
    function () {
        $("#formulario").hide();
        $("#result").hide();

        let formTriangulo = "<label for='lOpuesto' class='label'> Lado Opuesto </label>" +
            "<input type='number' step='any' id='lOpuesto' name='lOpuesto' value='0' class='input'/>" +
            "<label for='lAdyacente' class='label'> Lado Adyacente </label>" +
            "<input type='number' step='any' id='lAdyacente' name='lAdyacente' value='0' class='input'/>" +
            "<label for='hipotenusa' class='label'> Hipotenusa </label>" +
            "<input type='number' step='any' id='hipotenusa' name='hipotenusa' value='0' class='input'/>";

        let formRectangulo = "<label for='base' class='label'> Base </label>" +
            "<input type='number' step='any' id='base' name='base' value='0' class='input'/>" +
            "<label for='altura' class='label'> Altura </label>" +
            "<input type='number' step='any' id='altura' name='altura' value='0' class='input'/>";

        let button = "<button id='btn' disabled class='btn'> Calcular </button>";

        $("#select").change(
            function () {
                let typeFig = $("#select").val();
                if (typeFig === "1")
                    $("#formulario").html(formTriangulo + button);
                else if (typeFig === "2")
                    $("#formulario").html(formRectangulo + button);
                else
                    $("#formulario").html("");
                $("#formulario").show();
                $("#result").hide();
            }
        );

        $("#formulario").on('change', "#lOpuesto", function () {
            let lOpuesto = Number($("#lOpuesto").val())
            let lAdyacente = Number($("#lAdyacente").val())
            let hipotenusa = Number($("#hipotenusa").val())
            let button = $("#btn").prop('disabled')

            if (button && lAdyacente > 0 && hipotenusa > 0) {
                $("#btn").attr('disabled', false);
            }

            if (lOpuesto < 0) {
                $("#btn").attr('disabled', true);
            }
        });

        $("#formulario").on('change', "#lAdyacente", function () {
            let lOpuesto = Number($("#lOpuesto").val())
            let lAdyacente = Number($("#lAdyacente").val())
            let hipotenusa = Number($("#hipotenusa").val())
            let button = $("#btn").prop('disabled')

            if (button && hipotenusa > 0 && lOpuesto > 0) {
                $("#btn").attr('disabled', false);
            }

            if (lAdyacente < 0) {
                $("#btn").attr('disabled', true);
            }
        });

        $("#formulario").on('change', "#hipotenusa", function () {
            let lOpuesto = Number($("#lOpuesto").val())
            let lAdyacente = Number($("#lAdyacente").val())
            let hipotenusa = Number($("#hipotenusa").val())
            let button = $("#btn").prop('disabled')

            if (button && lAdyacente > 0 && lOpuesto > 0) {
                $("#btn").attr('disabled', false);
            }

            if (hipotenusa < 0) {
                $("#btn").attr('disabled', true);
            }
        });

        $("#formulario").on('change', "#altura", function () {
            let base = Number($("#base").val())
            let altura = Number($("#altura").val())
            let button = $("#btn").prop('disabled')

            if (button && base > 0) {
                $("#btn").attr('disabled', false);
            }

            if (altura < 0) {
                $("#btn").attr('disabled', true);
            }
        });

        $("#formulario").on('change', "#base", function () {
            let base = Number($("#base").val())
            let altura = Number($("#altura").val())
            let button = $("#btn").prop('disabled')

            if (button && altura > 0) {
                $("#btn").attr('disabled', false);
            }

            if (base < 0) {
                $("#btn").attr('disabled', true);
            }
        });

        $("#formulario").on('click', '#btn', function () {
            let eleccionFig = $("#select").val();
            let valuesCal = null;
            if (eleccionFig === "1") {
                let lOpuesto = Number($("#lOpuesto").val())
                let lAdyacente = Number($("#lAdyacente").val())
                let hipotenusa = Number($("#hipotenusa").val())
                valuesCal = {
                    'opuesto': lOpuesto,
                    'adyacente': lAdyacente,
                    'hipotenusa': hipotenusa,
                    'figura': '1'
                }
            }
            else if (eleccionFig === "2") {
                let base = Number($("#base").val())
                let altura = Number($("#altura").val())
                valuesCal = {
                    'altura': altura,
                    'base': base,
                    'figura': '2'
                }
            }
            else {
                return;
            }

            AjaxProcess(valuesCal);
        });

        function AjaxProcess(data) {
            $.ajax({
                type: "POST",
                url: "../service/Proceso.php",
                data: data,
                dataType: "json",
                success: function (data) {
                    let eleccionFig = $("#select").val();
                    let resultStruct = null;
                    if (eleccionFig == 1) {
                        resultStruct = "<tr> <td>Lado Opuesto</td> <td>" + Number($("#lOpuesto").val()) + "</td> <tr> <td>Lado Adyacente</td> <td>" + Number($("#lAdyacente").val()) + "</td> <tr> <td>Hipotenusa</td> <td>" + Number($("#hipotenusa").val()) + "</td>";
                        $("#lOpuesto").val(0);
                        $("#lAdyacente").val(0);
                        $("#hipotenusa").val(0);
                    }
                    else if (eleccionFig == 2) {
                        resultStruct = "<tr> <td> Altura </td> <td>" + Number($("#altura").val()) + "</td> <tr> <td> Base </td> <td>" + Number($("#base").val()) + "</td>";
                        $("#altura").val(0);
                        $("#base").val(0);
                    }
                    resultStruct = resultStruct + " <tr> <td>Area</td> <td>" + data['area'] + "</td> <tr> <td>Perimetro</td> <td>" + data['perimetro'] + "</td> <tr> <td>Nombre de figura</td> <td>" + data['nombreFig'] + "</td>";
                    $("#btn").attr('disabled', true);
                    $("#tbody").html(resultStruct);
                    $("#result").show();
                },
                error: function () {
                    alert("ERROR");
                }
            });
        }
    }
);