"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectInput({
  name,
  label,
  control,
  desc,
  placeholder,
  options,
  matchField = "value",
  renderField = "label",
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {desc && <FormDescription>{desc}</FormDescription>}
          <FormControl>
            <Select value={field?.value} onValueChange={field?.onChange}>
              <SelectTrigger className="w-full dark:bg-neutral-900 dark:border-neutral-700">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {Array.isArray(options) &&
                  options.map((option) => (
                    <SelectItem
                      key={option?.[matchField]}
                      value={option?.[matchField]}
                    >
                      {option?.[renderField]}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
