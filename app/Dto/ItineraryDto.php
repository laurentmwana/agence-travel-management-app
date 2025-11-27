<?php

namespace App\Dto;

use App\Enums\ItineraryTypeEnum;

class ItineraryDto
{
      private string|null $note;
      private ItineraryTypeEnum $type;
      private bool $isScheduled;
      private int $availableSeats;
      private float $pricePerSeat;
      private float $pricePerPerson;
      private string|null $distanceKm;
      private $startAt;
      private $startDestinationId;
      private $endDestinationId;


      /**
       * Get the value of note
       *
       * @return string|null
       */
      public function getNote(): string|null
      {
            return $this->note;
      }

      /**
       * Set the value of note
       *
       * @param string|null $note
       *
       * @return self
       */
      public function setNote(string|null $note): self
      {
            $this->note = $note;
            return $this;
      }

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
       * Get the value of availableSeats
       *
       * @return int
       */
      public function getAvailableSeats(): int
      {
            return $this->availableSeats;
      }

      /**
       * Set the value of availableSeats
       *
       * @param int $availableSeats
       *
       * @return self
       */
      public function setAvailableSeats(int $availableSeats): self
      {
            $this->availableSeats = $availableSeats;
            return $this;
      }

      /**
       * Get the value of pricePerSeat
       *
       * @return float
       */
      public function getPricePerSeat(): float
      {
            return $this->pricePerSeat;
      }

      /**
       * Set the value of pricePerSeat
       *
       * @param float $pricePerSeat
       *
       * @return self
       */
      public function setPricePerSeat(float $pricePerSeat): self
      {
            $this->pricePerSeat = $pricePerSeat;
            return $this;
      }

      /**
       * Get the value of pricePerPerson
       *
       * @return float
       */
      public function getPricePerPerson(): float
      {
            return $this->pricePerPerson;
      }

      /**
       * Set the value of pricePerPerson
       *
       * @param float $pricePerPerson
       *
       * @return self
       */
      public function setPricePerPerson(float $pricePerPerson): self
      {
            $this->pricePerPerson = $pricePerPerson;
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
       * Get the value of startAt
       */
      public function getStartAt(): string
      {
            return $this->startAt;
      }

      /**
       * Set the value of startAt
       */
      public function setStartAt($startAt): self
      {
            $this->startAt = $startAt;
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
