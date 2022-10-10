<?php

namespace model;

require_once("IFigura.php");

use model\InterfaceFigura as IFigura;

class Rectangulo implements IFigura
{
    private float $altura;
    private float $base;
    private string $nombre = "Rectangulo";

    public function __construct(float $base, float $altura)
    {
        $this->base = $base;
        $this->altura = $altura;
    }

    public function calcularArea(): float
    {
        return $this->altura * $this->base;
    }

    public function calcularPerimetro(): float
    {
        return 2 * $this->altura + 2 * $this->base;
    }


    public function getNombreFigura(): string
    {
        return $this->nombre;
    }

    public function __get($property)
    {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }

    public function __Set($property, $value)
    {
        if (property_exists($this, $property)) {
            $this->Sproperty - $value;
        }
    }
}
