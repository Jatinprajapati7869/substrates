# UI kit licenses (D13 gate)

Owner states all kits in the old startup folder are owned and licensed (2026-11-03). **Resale of derived templates** is a separate question from ownership. This table records what each kit’s license files say about redistribution/resale. P11 must not ship real **Product content** for a kit row that is **no** until counsel or the license text says otherwise.

Evidence files live under `Startup/repos/Resoruces if ever needed/licenses/` (gitignored). This doc was filled without reading those file contents (P10 constraint: Startup paths listed by filename only).

| Kit          | License type | Resale of derived templates allowed | Evidence file                                              | Quoted line |
| ------------ | ------------ | ----------------------------------- | ---------------------------------------------------------- | ----------- |
| Azurio       | unknown      | unknown                             | `AZURIO_ACTIVATION_CERTIFICATE.txt`, `AZURIO_license.json` | —           |
| Flowbite Pro | unknown      | unknown                             | `FLWBTE_ACTIVATION_CERTIFICATE.txt`, `FLWBTE_license.json` | —           |
| Gogo         | unknown      | unknown                             | `GOGOMU_ACTIVATION_CERTIFICATE.txt`, `GOGOMU_license.json` | —           |
| Magicoon     | unknown      | unknown                             | `MAGICO_ACTIVATION_CERTIFICATE.txt`, `MAGICO_license.json` | —           |
| Materialize  | unknown      | unknown                             | `MTRLIZ_ACTIVATION_CERTIFICATE.txt`, `MTRLIZ_license.json` | —           |
| Metronic     | unknown      | unknown                             | `MTRNIC_ACTIVATION_CERTIFICATE.txt`, `MTRNIC_license.json` | —           |
| Tailwind UI  | unknown      | unknown                             | `TLWNDU_ACTIVATION_CERTIFICATE.txt`, `TLWNDU_license.json` | —           |
| UBold        | unknown      | unknown                             | `UBOLDA_ACTIVATION_CERTIFICATE.txt`, `UBOLDA_license.json` | —           |

## How to complete this table

1. Open the evidence file for the kit.
2. Copy the single most relevant sentence about redistribution, resale, or sublicensing into **Quoted line** (verbatim, no interpretation).
3. Set **Resale of derived templates allowed** to `yes`, `no`, or leave `unknown` if the file does not address resale of work you built on top of the kit.
4. Set **License type** from the certificate name or JSON `license` field only.

## Precondition (D13)

Before launch: every shipped product must map to kits whose resale row is **yes** or to wholly original work. Rows still **unknown** block shipping content that depends on that kit.
