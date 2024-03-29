<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBoxTests;

use Nette\Forms\Controls\SelectBox;
use Nette\Utils\Html;
use Nette\Utils\Json;
use Nette\Utils\JsonException;
use PHPUnit\Framework\TestCase;
use Wavevision\DependentSelectBox\DependentData;
use Wavevision\DependentSelectBox\DependentSelectBox;
use Wavevision\DependentSelectBox\DependentValues;
use Wavevision\DependentSelectBox\Form\Form;
use Wavevision\DependentSelectBox\InvalidDependentCallback;
use Wavevision\DependentSelectBox\LoadDependentData;
use function array_map;
use function implode;

class LoadDependentDataTest extends TestCase
{

	private const FIRST = 'first';

	private const SECOND = 'second';

	private const THIRD = 'third';

	public function testThrowCallbackMustBeSet(): void
	{
		$form = $this->createForm();
		$form->getRenderer()->render($form);
		$process = new LoadDependentData();
		$this->expectException(InvalidDependentCallback::class);
		$process->process(
			$form->getDependentSelectBoxes(),
			$this->createFormPayload()
		);
	}

	public function testThrowCallbackMustReturnDependentData(): void
	{
		$form = $this->createForm();
		$this->getSelectBox($form, self::SECOND)->setDependentCallback(
			function () {
				return 'something misguided';
			}
		);
		$form->getRenderer()->render($form);
		$process = new LoadDependentData();
		$this->expectException(InvalidDependentCallback::class);
		$process->process($form->getDependentSelectBoxes(), $this->createFormPayload());
	}

	public function testReturnSelectedData(): void
	{
		$form = $this->createForm();
		$payloadValues = [
			self::FIRST => 1,
		];
		$this->getSelectBox($form, self::SECOND)
			->setDependentCallback(
				function (DependentValues $values) use ($payloadValues) {
					$this->assertEquals($payloadValues, $values->getRawValues());
					$this->assertEquals($payloadValues, $values->getContainerRawValues());
					return (new DependentData())->setItems([1 => 'one', 2 => 'two'])->setValue(1);
				}
			);
		$this->assertHasValues(
			$form,
			[
				self::SECOND => [
					'disabled' => false,
					'options' => [
						[
							'value' => '',
							'text' => 'forms.general.choose',
						],
						[
							'value' => 1,
							'text' => 'one',
							'selected' => true,
						],
						[
							'value' => 2,
							'text' => 'two',
						],
					],
				],
			],
			$this->createPayload(
				self::FIRST,
				$payloadValues
			)
		);
	}

	public function testShouldSelectFirstIfOnlyOne(): void
	{
		$form = $this->createForm();
		$payloadValues = [
			self::FIRST => 1,
		];
		$this->getSelectBox($form, self::SECOND)
			->setAutoSelectSingleValue(true)
			->setDependentCallback($this->createDependentCallback([1 => 'one']));
		$this->assertHasValues(
			$form,
			[
				self::SECOND => [
					'disabled' => false,
					'options' => [
						[
							'value' => '',
							'text' => 'forms.general.choose',
						],
						[
							'value' => 1,
							'text' => 'one',
							'selected' => true,
						],
					],
				],
			],
			$this->createPayload(
				self::FIRST,
				$payloadValues
			)
		);
	}

	public function testShouldResetDescendantValues(): void
	{
		$form = $this->createForm();
		$payloadValues = [
			self::FIRST => 1,
		];
		$this->getSelectBox($form, self::SECOND)
			->setDependentCallback($this->createDependentCallback([1 => 1, 2 => 2]));
		/** @var SelectBox $first */
		$first = $form[self::FIRST];
		/** @var SelectBox $second */
		$second = $form[self::SECOND];
		$form->addDependentSelectBox(
			self::THIRD,
			self::THIRD,
			$first,
			$second,
		)
			->setDependentCallback($this->createDependentCallback([3 => 3, 4 => 4]))
			->setPrompt('third prompt');
		$this->assertHasValues(
			$form,
			[
				self::SECOND => [
					'disabled' => false,
					'options' => [
						[
							'value' => '',
							'text' => 'forms.general.choose',
						],
						[
							'value' => 1,
							'text' => 1,
						],
						[
							'value' => 2,
							'text' => 2,
						],
					],
				],
				self::THIRD => [
					'disabled' => false,
					'options' => [
						[
							'value' => '',
							'text' => 'third prompt',
						],
					],
				],
			],
			$this->createPayload(
				self::FIRST,
				$payloadValues
			)
		);
	}

	public function testIgnoreOtherDependentSelectBoxes(): void
	{
		$form = new Form();
		$payloadValues = [
			'a[1][pizza]' => 'salami',
		];
		$containerA = $form->addContainer('a');
		$containerB = $form->addContainer('b');
		$hamburger = $containerB->addText('hamburger');
		$containerB->addDependentSelectBox('parts', 'parts', $hamburger);
		$containerA1 = $containerA->addContainer('1');
		$pizza = $containerA1->addText('pizza', 'pizza');
		$containerA1->addDependentSelectBox('topping', 'topping', $pizza)
			->setDependentCallback(
				function (DependentValues $dependentValues) {
					$this->assertEquals(
						[
							'a' => [
								'1' => [
									'pizza' => 'salami',
								],
							],
						],
						$dependentValues->getRawValues()
					);
					$this->assertEquals(['pizza' => 'salami'], $dependentValues->getContainerRawValues());
					return (new DependentData())->setItems([1 => 'garlic', 2 => 'pineapple']);
				}
			)->setHidePromptWhenFilled();
		$this->assertHasValues(
			$form,
			[
				'a-1-topping' => [
					'disabled' => false,
					'options' => [
						[
							'value' => 1,
							'text' => 'garlic',
						],
						[
							'value' => 2,
							'text' => 'pineapple',
						],
					],
				],
			],
			$this->createPayload('a-1-pizza', $payloadValues)
		);
	}

	public function testReturnConditionalDependentData(): void
	{
		$form = new Form();
		$shoeSize = $form->addSelect('shoeSize', 'shoeSize', [1 => '42', 2 => '43', 3 => 'other']);
		$customShoeSize = $form->addText('customShoeSize', 'customShoeSize');
		$form->addDependentSelectBox('shoe', 'shoe', $shoeSize)
			->addConditionalParent($customShoeSize, $shoeSize, 'other')
			->setDependentCallback($this->createDependentCallback([1 => 'adidas', 2 => 'nike']));
		$this->assertHasValues(
			$form,
			[
				'shoe' => [
					'disabled' => false,
					'options' => [
						[
							'value' => '',
							'text' => 'forms.general.choose',
						],
						[
							'value' => 1,
							'text' => 'adidas',
						],
						[
							'value' => 2,
							'text' => 'nike',
						],
					],
				],
			],
			$this->createPayload(
				'customShoeSize',
				[
					'shoeSize' => 'other',
					'customShoeSize' => 'tiny tiny shoes',
				]
			)
		);
	}

	/**
	 * @param mixed[] $options
	 * @throws InvalidDependentCallback
	 * @throws JsonException
	 */
	private function assertHasValues(Form $form, array $options, string $payload): void
	{
		$form->getRenderer()->render($form);
		$process = new LoadDependentData();
		$this->assertEquals(
			$this->formatOptions($options),
			$process->process(
				$form->getDependentSelectBoxes(),
				$payload
			)
		);
	}

	/**
	 * @param mixed[] $items
	 */
	private function createDependentCallback(array $items): callable
	{
		return function () use ($items) {
			$data = new DependentData();
			$data->setItems($items);
			return $data;
		};
	}

	private function createForm(): Form
	{
		$form = new Form();
		$form->addSelect(self::FIRST, self::FIRST, [1 => 'one', 2 => 'two'])
			->setPrompt('--choose--');
		/** @var SelectBox $first */
		$first = $form[self::FIRST];
		$form->addDependentSelectBox(
			self::SECOND,
			self::SECOND,
			$first
		)
			->setPrompt('--choose from parent first--')
			->setDisabledWhenEmpty();
		return $form;
	}

	private function createFormPayload(): string
	{
		return $this->createPayload(self::FIRST, [self::FIRST => 1]);
	}

	/**
	 * @param mixed[] $data
	 * @throws JsonException
	 */
	private function createPayload(string $trigger, array $data): string
	{
		return Json::encode(
			[
				LoadDependentData::TRIGGER => $this->getFormName($trigger),
				LoadDependentData::VALUES => $data,
			]
		);
	}

	/**
	 * @param mixed[] $optionsWrap
	 * @return mixed[]
	 */
	private function formatOptions(array $optionsWrap): array
	{
		$formatted = [];
		foreach ($optionsWrap as $name => $optionWrap) {
			$options = array_map(
				function ($option): string {
					$htmlOption = Html::el('option')
						->setAttribute('value', $option['value'])
						->setText($option['text']);
					if (isset($option['selected']) && $option['selected']) {
						$htmlOption->setAttribute('selected', true);
					}
					return (string)$htmlOption;
				},
				$optionWrap['options']
			);
			$formatted[$this->getFormName($name)] = [
				'disabled' => $optionWrap['disabled'],
				'options' => $this->renderOptions(...$options),
			];
		}
		return $formatted;
	}

	private function getFormName(string $name): string
	{
		return "frm-$name";
	}

	private function getSelectBox(Form $form, string $name): DependentSelectBox
	{
		/** @var DependentSelectBox $selectBox */
		$selectBox = $form[$name];
		return $selectBox;
	}

	private function renderOptions(string ...$options): string
	{
		return implode('', $options);
	}

}
