<?php

require_once("../model/IRectangulo.php");
require_once("../model/ITrianguloR.php");

use model\Rectangulo as Rectangulo;
use model\TrianguloR as TrianguloR;


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!empty($_POST["figura"])) {
        $figura = null;
        $result = null;
        if ($_POST["figura"] === "1") {
            $figura = new TrianguloR(floatval($_POST["opuesto"]), floatval($_POST["adyacente"]), floatval($_POST["hipotenusa"]));
        } else if ($_POST["figura"] === "2") {
            $figura = new Rectangulo(floatval($_POST["altura"]), floatval($_POST["base"]));
        }
        if ($figura !== null) {
            $result = array(
                'nombreFig' => $figura->getNombreFigura(),
                'area' => number_format($figura->calcularArea(), 2),
                'perimetro' => number_format($figura->calcularPerimetro(), 2)
            );
        }
        if ($result != null) {
            echo json_encode($result);
        }
    } else {
        echo json_encode("ERROR 1");
    }
}
