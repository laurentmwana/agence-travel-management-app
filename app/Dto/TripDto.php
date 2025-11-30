<?php

namespace App\Dto;

class TripDto
{
      private string $perfomedAt;
      private string|null $observation = null;
      private float $totalCcost = 0;
      private float $revenue = 0;
      private float $netProfit = 0;
      private float $fuelCost = 0;
      private float $fuelQuantity;
      private float $otherExpenses = 0;
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
       * Get the value of totalCcost
       *
       * @return float
       */
      public function getTotalCcost(): float
      {
            return $this->totalCcost;
      }

      /**
       * Set the value of totalCcost
       *
       * @param float $totalCcost
       *
       * @return self
       */
      public function setTotalCcost(float $totalCcost): self
      {
            $this->totalCcost = $totalCcost;
            return $this;
      }

      /**
       * Get the value of revenue
       *
       * @return float
       */
      public function getRevenue(): float
      {
            return $this->revenue;
      }

      /**
       * Set the value of revenue
       *
       * @param float $revenue
       *
       * @return self
       */
      public function setRevenue(float $revenue): self
      {
            $this->revenue = $revenue;
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
       * Get the value of fuelCost
       *
       * @return float
       */
      public function getFuelCost(): float
      {
            return $this->fuelCost;
      }

      /**
       * Set the value of fuelCost
       *
       * @param float $fuelCost
       *
       * @return self
       */
      public function setFuelCost(float $fuelCost): self
      {
            $this->fuelCost = $fuelCost;
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
       * @return float
       */
      public function getOtherExpenses(): float
      {
            return $this->otherExpenses;
      }

      /**
       * Set the value of otherExpenses
       *
       * @param float $otherExpenses
       *
       * @return self
       */
      public function setOtherExpenses(float $otherExpenses): self
      {
            $this->otherExpenses = $otherExpenses;
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
