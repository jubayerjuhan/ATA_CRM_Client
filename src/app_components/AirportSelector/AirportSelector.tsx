import { client } from "@/api/api";
import React, { useState, useEffect, useRef } from "react";
import styles from "./AirportSelector.module.scss";
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form";

type AirportSelectorProps = {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  required?: boolean;
  errorMessage?: string;
};
export const AirportSelector = ({
  label,
  name,
  register,
  setValue,
  errorMessage,
  required = false,
}: AirportSelectorProps): JSX.Element => {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [airports, setAirports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = async (searchTerm: string): Promise<void> => {
    if (!searchTerm || searchTerm.length < 3) {
      setAirports([]);
      setValue(name, ""); // Clear the form value when search is cleared
      return;
    }
    setLoading(true);
    try {
      const { data } = await client.get(`/airports?search=${searchTerm}`);
      setAirports(data);
      setIsDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
  }, []);

  const handleSelectAirport = (airport: any) => {
    setDisplayValue(`${airport.name} (${airport.code})`);
    setValue(name, airport._id);
    setIsDropdownVisible(false);
  };

  return (
    <div className={styles.airportSelector}>
      <div className={styles.inputWrapper}>
        <label htmlFor={name} className={styles.label}>
          {label} {required && <span>*</span>}
        </label>
        <input
          type="text"
          placeholder="Search airports"
          className={styles.input}
          id={name}
          {...register(name, {
            required: required ? `${label} is required` : false,
          })}
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
      {isDropdownVisible && airports.length > 0 && (
        <div className={styles.dropdown} ref={dropdownRef}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Searching airports...</p>
            </div>
          ) : (
            <ul className={styles.airportList}>
              {airports.map((airport) => (
                <li
                  key={airport.code}
                  className={styles.airportItem}
                  onClick={() => handleSelectAirport(airport)}
                >
                  <span className={styles.airportName}>{airport.name}</span>
                  <span className={styles.airportLocation}>
                    {airport.city}, {airport.state} ({airport.code})
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
