<?php

namespace App\Dto;

use App\Enums\ItineraryTypeEnum;

class ItineraryDto
{
      private ItineraryTypeEnum $type;
      private bool $isScheduled;
      private string|null $distanceKm;
      private $startDestinationId;
      private $endDestinationId;

      /**
       * Get the value of type
       *
       * @return ItineraryTypeEnum
       */
      public function getType(): ItineraryTypeEnum
      {
            return $this->type;
      }

      /**
       * Set the value of type
       *
       * @param string $type
       *
       * @return self
       */
      public function setType(string $type): self
      {
            $this->type = ItineraryTypeEnum::from($type);
            return $this;
      }

      /**
       * Get the value of isScheduled
       *
       * @return bool
       */
      public function getIsScheduled(): bool
      {
            return $this->isScheduled;
      }

      /**
       * Set the value of isScheduled
       *
       * @param bool $isScheduled
       *
       * @return self
       */
      public function setIsScheduled(bool $isScheduled): self
      {
            $this->isScheduled = $isScheduled;
            return $this;
      }

      /**
       * Get the value of distanceKm
       *
       * @return string
       */
      public function getDistanceKm(): string
      {
            return $this->distanceKm;
      }

      /**
       * Set the value of distanceKm
       *
       * @param string|null $distanceKm
       *
       * @return self
       */
      public function setDistanceKm(string $distanceKm): self
      {
            $this->distanceKm = $distanceKm;
            return $this;
      }

      /**
       * Get the value of startId
       */
      public function getStartDestinationId()
      {
            return $this->startDestinationId;
      }

      /**
       * Set the value of startId
       */
      public function setStartDestinationId(string $startDestinationId): self
      {
            $this->startDestinationId = $startDestinationId;
            return $this;
      }

      /**
       * Get the value of endDestinationId
       */
      public function getEndDestinationId()
      {
            return $this->endDestinationId;
      }

      /**
       * Set the value of endDestinationId
       */
      public function setEndDestinationId(string $endDestinationId): self
      {
            $this->endDestinationId = $endDestinationId;
            return $this;
      }
}
