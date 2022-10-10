<?php

namespace model;

require_once("IFigura.php");

use model\InterfaceFigura as IFigura;

class TrianguloR implements IFigura
{
    private float $opuesto;
    private float $adyacente;
    private float $hipotenusa;
    private string $nombre = "Triangulo rectangulo";

    public function __construct(float $opuesto, float $adyacente, float $hipotenusa)
    {
        $this->opuesto = $opuesto;
        $this->adyacente = $adyacente;
        $this->hipotenusa = $hipotenusa;
    }

    public function calcularArea(): float
    {
        return ($this->opuesto * $this->adyacente) / 2;
    }


    public function calcularPerimetro(): float
    {
        return $this->opuesto + $this->adyacente + $this->hipotenusa;
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
