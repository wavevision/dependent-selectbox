# Wavevision Dependent SelectBox

[![Build Status](https://travis-ci.org/wavevision/dependent-selectbox.svg?branch=master)](https://travis-ci.org/wavevision/dependent-selectbox)
[![Coverage Status](https://coveralls.io/repos/github/wavevision/dependent-selectbox/badge.svg?branch=master)](https://coveralls.io/github/wavevision/dependent-selectbox?branch=master)
[![PHPStan](https://img.shields.io/badge/style-level%20max-brightgreen.svg?label=phpstan)](https://github.com/phpstan/phpstan)
[![Naja](https://img.shields.io/badge/naja-1.6.0-blue)](https://github.com/jiripudil/Naja)

Dependent select box component for [nette/forms](https://github.com/nette/forms) with [naja](https://github.com/jiripudil/Naja) extension on client side.

## Features:

- strict typed
- works on any form without customizing its renderer (no need for snippets)
- supports form containers (unlimited depth, both for select box itself and its parents)
- TypeScript and Naja powered client side with events emitted so you can attach listeners to them
- conditional parents (make a form control become a select box's parent when some other control has a certain value)

## Installation

Use [Composer](http://getcomposer.org) to get the Nette forms component

```bash
composer require wavevision/dependent-selectbox
```

Install the client side via [Yarn](https://yarnpkg.com)

```bash
yarn add @wavevision/dependent-selectbox
```

or [npm](https://npmjs.com)

```bash
npm install --save @wavevision/dependent-selectbox
```

## Usage

### Server side

Create a form that will be an instance of `Wavevision\DependentSelectBox\Form\Form`.

If you don't want to / cannot inherit from our base form, just make sure the form you create uses
`Wavevision\DependentSelectBox\Form\DependentForm` trait.

Your form should also use `Wavevision\DependentSelectBox\Form\DependentContainer` to have its containers extended with
the dependent select box too, however, if you already have your own implementation of `Nette\Forms\Container`,
just make sure the container uses `Wavevision\DependentSelectBox\Form\DependentControl` trait.

After this, your form and its containers will be extended with `addDependentSelectBox` method. This method accepts following arguments:

| **Argument**  | **Type**                             | **Description**                                                                                |
| ------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `$name`       | `string`                             | name of the control                                                                            |
| `$label`      | `string`                             | label for the control                                                                          |
| `...$parents` | `Nette\Forms\Controls\BaseControl[]` | list of form controls whom's values will be treated as parent values to get the dependent data |

The method returns an instance of [`Wavevision\DependentSelectBox\DependentSelectBox`](./src/DependentSelectBox/DependentSelectBox.php).

Example implementation of dependent select box in a form wrapped in a `Control` component:

```php
use Nette\Application\UI\Control;
use Nette\Application\UI\Presenter;
use Wavevision\DependentSelectBox\DependentComponent;
use Wavevision\DependentSelectBox\DependentData;
use Wavevision\DependentSelectBox\DependentValues;
use Wavevision\DependentSelectBox\Form\Form;

class FormComponent extends Control
{

    // add 'loadDependenData' signal and a few utilities
    use DependentComponent;

    public function __construct()
    {
        $this->monitor(Presenter::class, function (): void {
            // setup form in component - optionally pass form name (default 'form')
            $this->dependentComponentSetup();
            if ($this->hasReceivedDependentSignal()) {
                // if 'loadDependenData' signal received, do anything extra we need
            }
        });
    }

    protected function createComponentForm(): Form
    {
        // create your form as you are used to
        // ...
        //
        $form->addDependentSelectBox('name', 'Label', $form['someParentControl'])
            ->setDependentCallback(function (DependentValues $values): DependentData {
                // get ArrayHash values, if you perfer array, use getRawValues
                $formattedValues = $values->getValues();
                $data = new DependentData();
                if ($formattedValues->someParentControl === 'someDependentValue') {
                    $data->setItems(['firstItem' => 'firstValue']);
                }
                return $data;
            })
            // make the select box disabled when no values have been loaded
            ->setDisabledWhenEmpty()
            // if loaded values contain only one item, select it so the user does not have to
            ->setAutoSelectSingleValue()
            // if 'someOtherControl' has 'someValue', treat 'someControl' as parent
            ->addConditionalParent($form['someControl'], $form['someOtherControl'], 'someValue');
        // add form handlers etc.
        // ...
        //
        return $form;
    }
}
```

### Client side

There are a few ways of integrating the client side into your project.

#### 1. Register dependent select box as Naja extension

```typescript
import naja from 'naja';
import DependentSelectBox from '@wavevision/dependent-selectbox';

naja.registerExtension(DependentSelectBox);
```

As mentioned in features, the extension emits two events you can attach listeners to. They are:

- `dependentSelectBoxLoading` – fires right after a parent changes and a request to server is being dispatched
- `dependentSelectBoxLoaded` – fires when the data loading is finished

Listeners for both events will receive an object with these properties:

- `form: HTMLFormElement` – the form in which the event has been triggered
- `dependentSelectBoxes: HTMLSelectElement[]` – an array of all dependent select boxes in the form

The first event also contains `data` property, which is an object containing:

- `trigger: string` – HTML `id` of a parent that triggered the event
- `values: Record<string, boolean | number | string | null>` – object with values of all parents of the select box(es)
  whose parent triggered the event (`name` properties of parent elements are used as keys)

Please, refer to [Naja docs](https://naja.js.org) to find out more about its extensions.

#### 2. Import bundled version with Naja included

If you don't use Naja elsewhere in your project an you don't want to set it up, this is your way to go.

⚠️ **WARNING:** This might collide with other Nette AJAX libraries, if used!

```typescript
import '@wavevision/dependent-selectbox/dist/dependentSelectBox.all';
```

#### 3. Use it directly in a `script` tag

For old-school people only 😎.

```html
<script src="/path/to/assets/dependentSelectBox.all.js"></script>
```
