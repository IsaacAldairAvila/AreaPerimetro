<?php

namespace model;

interface InterfaceFigura
{
    function calcularArea(): float;
    function calcularPerimetro(): float;
    function getNombreFigura(): String;
}
