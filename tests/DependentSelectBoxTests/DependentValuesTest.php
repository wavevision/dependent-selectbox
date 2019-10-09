<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBoxTests;

use Nette\Utils\ArrayHash;
use PHPUnit\Framework\TestCase;
use Wavevision\DependentSelectBox\DependentValues;

class DependentValuesTest extends TestCase
{

	public function testDependentValues(): void
	{
		$data = [['one' => 1], ['container' => ['one' => 1]]];
		[$values, $containerValues] = $data;
		$dependentValues = new DependentValues($values, $containerValues, null);
		$this->assertNull($dependentValues->getSelectedValue());
		$this->assertEquals(ArrayHash::from($values), $dependentValues->getValues());
		$this->assertEquals(ArrayHash::from($containerValues), $dependentValues->getContainerValues());
	}
}
