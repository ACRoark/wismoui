# Working with Modals

The application supports easily working with Modals that appear as a floating layer over the current page to get user feedback or display information.

## Usage

```
import React from 'react';

import Button from 'components/Button';
import useModal from 'hooks/useModal';

const MyComponent: React.FC = (): React.ReactElement => {
  const { hideModal, showModal } = useModal();

  const buttonClicked = (): void =>
    showModal({
      content: <div>Some content...</div>,
      footer: <Button onClick={hideModal}>Close</Button>,
      title: 'Basic Modal',
    });

  return (
    <Button onClick={buttonClicked}>Show Modal</Button>
  );
}

export default MyComponent;
```

## useModal

```
const { hideModal, showModal } = useModal();
```

The useModal hook makes it easy to display modal popovers in the application. Functions to show and hide the modal are returned.

### showModal

The `showModal` function is used to display a modal popover. The function accepts a settings object as a parameter and returns nothing. The properties of the object are:

| Property |                       Description                        |   Type    |  Default  |
| :------- | :------------------------------------------------------: | :-------: | :-------: |
| content  | Specifies the content displayed in the body of the modal | ReactNode |     -     |
| footer   | Additional elements rendered at the bottom of the modal  | ReactNode | undefined |
| title    |         The title shown at the top of the modal          | ReactNode | undefined |
|          |                                                          |           |           |

### hideModal

The `hideModal` function is used to hide/close a modal popover currently "open" (visible) in the UI. The function does not take any parameters nor does it return anything.

## Known Issues

We do not currently support rendering multiple modals at the same time. We didn't have the need, so we didn't make that work.
