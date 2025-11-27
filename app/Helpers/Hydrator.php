<?php

namespace App\Helpers;

class Hydrator
{

    /**
     *
     * @param array $data
     * @param object $object
     * @return object
     */
    public static function hydrate(array $data, object $object): object
    {
        foreach ($data as $key => $value) {
            $setter = self::getSetter($key);
            if (method_exists($object, $setter)) {
                $object->$setter($value);
            }
        }

        return $object;
    }

    private static function getSetter(string $string): string
    {
        return 'set' . lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $string))));
    }
}
