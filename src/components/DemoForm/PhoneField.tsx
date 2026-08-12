import PhoneInputBase from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { CountrySelect } from './CountrySelect'

// Country-code selector + number input, matching the intl-tel-input style: pick a
// country from the searchable flag dropdown (see CountrySelect.tsx) and its calling
// code is prefixed automatically — `countryCallingCodeEditable={false}` stops it
// from being typed/edited directly. The resulting value is a full E.164 string
// (e.g. "+32470123456"), so the country code always travels with the number,
// including in the n8n payload.
export function PhoneField({
  id,
  value,
  onChange,
}: {
  id: string
  value: string | undefined
  onChange: (value: string) => void
}) {
  return (
    <>
      <PhoneInputBase
        id={id}
        international
        countryCallingCodeEditable={false}
        defaultCountry="BE"
        value={value}
        onChange={(v) => onChange(v ?? '')}
        countrySelectComponent={CountrySelect}
      />
      <style>{`
        .PhoneInput {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid #d9d8d8;
          border-radius: 5px;
          background: #fff;
          padding: 0.625rem 1rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .PhoneInput:focus-within {
          border-color: #035cfc;
          box-shadow: 0 0 0 1px #035cfc;
        }
        .PhoneInputInput {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: inherit;
          color: #1a1a1a;
        }
      `}</style>
    </>
  )
}
