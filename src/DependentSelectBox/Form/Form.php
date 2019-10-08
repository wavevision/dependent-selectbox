<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBox\Form;

use Nette\Forms\Form as NetteForm;

class Form extends NetteForm
{

    // phpcs:disable
	use DependentFormContainer;
	use DependentFormControls;
    // phpcs:enable
}
