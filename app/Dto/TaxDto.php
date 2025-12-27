<?php

namespace App\Dto;

class TaxDto
{
      private string $name;
      private float $amount = 0;
      private ?string $description = null;

      /**
       * Get the value of name
       *
       * @return string
       */
      public function getName(): string
      {
            return $this->name;
      }

      /**
       * Set the value of name
       *
       * @param string $name
       *
       * @return self
       */
      public function setName(string $name): self
      {
            $this->name = $name;
            return $this;
      }

      /**
       * Get the value of amount
       *
       * @return float
       */
      public function getAmount(): float
      {
            return $this->amount;
      }

      /**
       * Set the value of amount
       *
       * @param float $amount
       *
       * @return self
       */
      public function setAmount(float $amount): self
      {
            $this->amount = $amount;
            return $this;
      }

      /**
       * Get the value of description
       *
       * @return string|null
       */
      public function getDescription(): string|null
      {
            return $this->description;
      }

      /**
       * Set the value of description
       *
       * @param string|null $description
       *
       * @return self
       */
      public function setDescription(?string $description): self
      {
            $this->description = $description;
            return $this;
      }
}
