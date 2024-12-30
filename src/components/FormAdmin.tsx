"use client";

import { useForm } from "react-hook-form";

export type Clothes = {
  title: string;
  description: string;
  price: number;
};

const FormAdmin = (): React.ReactElement => {
  const {
    reset,
    register,
    handleSubmit: handleSubmitRHF,
    formState: { errors },
  } = useForm<Clothes>();

  const handleSubmit = async (data: Clothes) => {
    try {
      const response = await fetch("http://localhost:4000/clothes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Datos enviados con éxito:", data);
        reset();
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <form className="my-10" onSubmit={handleSubmitRHF(handleSubmit)}>
      <label>Titulo</label>
      <input
        type="text"
        {...register("title", {
          required: true,
          maxLength: {
            value: 40,
            message: "El titulo no pude superar los 40 caracteres",
          },
          minLength: {
            value: 2,
            message: "El titulo debe tener al menos 2 caracteres",
          },
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "Ingrese un titulo valido",
          },
        })}
      />
      <span>{errors.title?.message}</span>

      <label>Descripción</label>
      <input
        type="text"
        {...register("description", {
          required: true,
          maxLength: {
            value: 150,
            message: "La descripción no pude superar los 150 caracteres",
          },
          minLength: {
            value: 8,
            message: "La descripción debe tener al menos 8 caracteres",
          },
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "Ingrese una descripcion valida",
          },
        })}
      />
      <span>{errors.description?.message}</span>

      <label>Precio</label>
      <input
        type="text"
        {...register("price", {
          required: true,
          pattern: {
            value: /^\d+(\.\d+)?$/,
            message: "Ingrese un numero valido",
          },
        })}
      />
      <span>{errors.price?.message}</span>

      <button type="submit" className="btn btn-primary">
        Cargar
      </button>
    </form>
  );
};

export default FormAdmin;
