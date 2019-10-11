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

If you don't want to / cannot inherit from our base form, just make sure the form you create uses following traits
critical for the dependent select box to work:

- `Wavevision\DependentSelectBox\Form\DependentFormContainer`
- `Wavevision\DependentSelectBox\Form\DependentFormControls`

After this, your form will be extended with `addDependentSelectBox` method. This method accepts following arguments:

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

    // add 'loadDependenData' signal handler and some utilities to your component
    use DependentComponent;

    public function __construct()
    {
        $this->monitor(Presenter::class, function (): void {
            // setup your component (instatiate LoadDependentData, add signal link to form)
            // you can pass your form's name as argument (default 'form')
            $this->dependentComponentSetup();
            if ($this->hasReceivedDependentSignal()) {
                // if our component received 'handleLoadDependentData', do something extra our app needs
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
            // if $form['someOtherControl'] has 'someValue', treat $form['someControl'] as parent, otherwise ignore it
            ->addConditionalParent($form['someControl'], $form['someOtherControl'], 'someValue');
        // add form handlers etc.
        // ...
        //
        return $form;
    }
}
```

### Client side

There are a few ways of how to integrate the client side into your project.

#### 1. Register dependent select box as Naja extension

```typescript
import naja from 'naja';
import DependentSelectBox from '@wavevision/dependent-selectbox';

naja.registerExtension(DependentSelectBox);
```

> The default version is minified, if you prefer unminified version, import `@wavevision/dependent-selectbox/dist/dependentSelectBox`.

As mentioned in features, the extension emits two events you can attach listeners to. They are:

- `dependentSelectBoxLoading`: fires, when loading of dependent data starts
- `dependentSelectBoxLoaded`: fires, when loading data finished

Both events pass an object to their listeners, the object has these properties:

- `form`: an `HTMLFormElement` in which the event has been triggered
- `dependentSelectBoxes`: a `NodeList<HTMLSelectElement>` containing all dependent select boxes on the current page

Please, refer to [Naja docs](https://naja.js.org) to find out more about its extensions.

#### 2. Import bundled version with Naja included

If you don't use Naja elsewhere in your project an you don't want to set it up, this is your way to go.

| ⚠️ **WARNING:** This might collide with other Nette AJAX libraries, if used! |
| --- |

```typescript
import '@wavevision/dependent-selectbox/dist/dependentSelectBox.all.min';
```

> If you prefer unminified version, just omit `.min`.

#### 3. Use it directly in a `script` tag

For old-school people only 😎.

```html
<script src="/path/to/assets/dependentSelectBox.all.min.js"></script>
```
