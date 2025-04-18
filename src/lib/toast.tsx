import { addToast } from '@heroui/react';
import React from 'react';

function CloseIcon() {
  return (
    <svg
      fill="none"
      height="32"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="32"
    >
      <title>close icon</title>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const baseToastConfig = {
  hideIcon: true,
  timeout: 3000,
  shouldShowTimeoutProgress: true,
  classNames: {
    closeButton: 'opacity-100 absolute right-4 top-1/2 -translate-y-1/2',
  },
  closeIcon: <CloseIcon />,
};

export function successToast(title: string) {
  addToast({
    ...baseToastConfig,
    title,
    color: 'success',
  });
}

export function errorToast(title: string) {
  addToast({
    ...baseToastConfig,
    title,
    color: 'danger',
  });
}
