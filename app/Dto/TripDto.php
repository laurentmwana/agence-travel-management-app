<?php

namespace App\Dto;

class TripDto
{
      private string $perfomedAt;
      private string|null $observation;
      private float $totalCost = 0;
      private float $netProfit = 0;
      private float $fuelQuantity = 0;
      private array $otherExpenses  = [];
      private array $affretements  = [];
      private float $fuelPrice = 0;
      private int $durationHours = 0;
      private int $itineraryId;

      /**
       * Get the value of perfomedAt
       *
       * @return string
       */
      public function getPerfomedAt(): string
      {
            return $this->perfomedAt;
      }

      /**
       * Set the value of perfomedAt
       *
       * @param string $perfomedAt
       *
       * @return self
       */
      public function setPerfomedAt(string $perfomedAt): self
      {
            $this->perfomedAt = $perfomedAt;
            return $this;
      }

      /**
       * Get the value of observation
       *
       * @return string|null
       */
      public function getObservation(): string|null
      {
            return $this->observation;
      }

      /**
       * Set the value of observation
       *
       * @param string|null $observation
       *
       * @return self
       */
      public function setObservation(string|null $observation): self
      {
            $this->observation = $observation;
            return $this;
      }

      /**
       * Get the value of totalCost
       *
       * @return float
       */
      public function getTotalCost(): float
      {
            return $this->totalCost;
      }

      /**
       * Set the value of totalCost
       *
       * @param float $totalCost
       *
       * @return self
       */
      public function setTotalCost(float $totalCost): self
      {
            $this->totalCost = $totalCost;
            return $this;
      }

      /**
       * Get the value of netProfit
       *
       * @return float
       */
      public function getNetProfit(): float
      {
            return $this->netProfit;
      }

      /**
       * Set the value of netProfit
       *
       * @param float $netProfit
       *
       * @return self
       */
      public function setNetProfit(float $netProfit): self
      {
            $this->netProfit = $netProfit;
            return $this;
      }

      /**
       * Get the value of fuelQuantity
       *
       * @return float
       */
      public function getFuelQuantity(): float
      {
            return $this->fuelQuantity;
      }

      /**
       * Set the value of fuelQuantity
       *
       * @param float $fuelQuantity
       *
       * @return self
       */
      public function setFuelQuantity(float $fuelQuantity): self
      {
            $this->fuelQuantity = $fuelQuantity;
            return $this;
      }

      /**
       * Get the value of otherExpenses
       *
       * @return array
       */
      public function getOtherExpenses(): array
      {
            return $this->otherExpenses;
      }

      /**
       * Set the value of otherExpenses
       *
       * @param array $otherExpenses
       *
       * @return self
       */
      public function setOtherExpenses(array $otherExpenses): self
      {
            $this->otherExpenses = $otherExpenses;
            return $this;
      }

      /**
       * Get the value of affretements
       *
       * @return array
       */
      public function getAffretements(): array
      {
            return $this->affretements;
      }

      /**
       * Set the value of affretements
       *
       * @param array $affretements
       *
       * @return self
       */
      public function setAffretements(array $affretements): self
      {
            $this->affretements = $affretements;
            return $this;
      }

      /**
       * Get the value of fuelPrice
       *
       * @return float
       */
      public function getFuelPrice(): float
      {
            return $this->fuelPrice;
      }

      /**
       * Set the value of fuelPrice
       *
       * @param float $fuelPrice
       *
       * @return self
       */
      public function setFuelPrice(float $fuelPrice): self
      {
            $this->fuelPrice = $fuelPrice;
            return $this;
      }

      /**
       * Get the value of durationHours
       *
       * @return int
       */
      public function getDurationHours(): int
      {
            return $this->durationHours;
      }

      /**
       * Set the value of durationHours
       *
       * @param int $durationHours
       *
       * @return self
       */
      public function setDurationHours(int $durationHours): self
      {
            $this->durationHours = $durationHours;
            return $this;
      }

      /**
       * Get the value of itineraryId
       *
       * @return int
       */
      public function getItineraryId(): int
      {
            return $this->itineraryId;
      }

      /**
       * Set the value of itineraryId
       *
       * @param int $itineraryId
       *
       * @return self
       */
      public function setItineraryId(int $itineraryId): self
      {
            $this->itineraryId = $itineraryId;
            return $this;
      }
}
