import { client } from "@/api/api";
import React, { useState, useEffect, useRef } from "react";
import styles from "./AirlineSelector.module.scss";
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form";

type AirlineSelectorProps = {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  required?: boolean;
  errorMessage?: string;
  defaultValue?: string;
  defaultDisplayValue?: string;
};

export const AirlineSelector = ({
  label,
  name,
  setValue,
  defaultValue,
  errorMessage,
  defaultDisplayValue,
  required = false,
}: AirlineSelectorProps): JSX.Element => {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [airlines, setAirlines] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = async (searchTerm: string): Promise<void> => {
    if (!searchTerm || searchTerm.length < 2) {
      setAirlines([]);
      setValue(name, ""); // Clear the form value when search is cleared
      return;
    }
    setLoading(true);
    try {
      const { data } = await client.get(`/airlines?search=${searchTerm}`);
      setAirlines(data);
      setIsDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching airlines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (defaultValue && defaultDisplayValue) {
      setValue(name, defaultValue);
      setDisplayValue(defaultDisplayValue);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [defaultDisplayValue, defaultValue, name, setValue]);

  const handleSelectAirline = (airline: any) => {
    setDisplayValue(`${airline.name} (${airline.iata})`);
    setValue(name, airline._id);
    setIsDropdownVisible(false);
  };

  return (
    <div className={styles.airlineSelector}>
      <div className={styles.inputWrapper}>
        <label htmlFor={name} className={styles.label}>
          {label} {required && <span>*</span>}
        </label>
        <input
          type="text"
          placeholder="Search airlines"
          className={styles.input}
          id={name}
          value={displayValue}
          onChange={(e) => {
            setDisplayValue(e.target.value);
            handleChange(e.target.value);
          }}
        />
        <span className={styles.searchIcon}>🔍</span>
      </div>
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
      {isDropdownVisible && airlines.length > 0 && (
        <div className={styles.dropdown} ref={dropdownRef}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Searching airlines...</p>
            </div>
          ) : (
            <ul className={styles.airlineList}>
              {airlines.map((airline) => (
                <li
                  key={airline.iata}
                  className={styles.airlineItem}
                  onClick={() => handleSelectAirline(airline)}
                >
                  <span className={styles.airlineName}>{airline.name}</span>
                  <span className={styles.airlineLocation}>
                    {airline.country} ({airline.iata})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
