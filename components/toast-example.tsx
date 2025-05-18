"use client";

import React from "react";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

export function ToastExample() {
  const showSuccessToast = () => {
    addToast({
      title: "Success!",
      description: "Your project has been saved successfully.",
      color: "success",
      variant: "flat",
      radius: "full",
    });
  };

  const showErrorToast = () => {
    addToast({
      title: "Error!",
      description: "Something went wrong. Please try again.",
      color: "danger",
      variant: "flat",
      radius: "full",
    });
  };

  const showInfoToast = () => {
    addToast({
      title: "Did you know?",
      description: "You can customize these notifications with various styles.",
      color: "primary",
      variant: "flat",
      radius: "full",
    });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <Button
        color="success"
        radius="full"
        variant="flat"
        onClick={showSuccessToast}
      >
        Show Success
      </Button>

      <Button
        color="danger"
        radius="full"
        variant="flat"
        onClick={showErrorToast}
      >
        Show Error
      </Button>

      <Button
        color="primary"
        radius="full"
        variant="flat"
        onClick={showInfoToast}
      >
        Show Info
      </Button>
    </div>
  );
}
