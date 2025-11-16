// components/admin/Produtos/FormActions/FormActions.jsx
"use client";

import React from "react";
import Button from "@/components/ui/Button";

export default function FormActions({ onCancel, onSave, isSaving = false }) {
  return (
    <div className="flex gap-2 justify-end items-center">
      <Button variant="outline" onClick={onCancel} type="button">
        Cancelar
      </Button>

      <Button variant="primary" onClick={onSave} type="submit" loading={isSaving}>
        {isSaving ? "Salvando..." : "Salvar"}
      </Button>
    </div>
  );
}
