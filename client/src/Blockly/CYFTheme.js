/**
 * @fileoverview Higher contrast, brandable theme.
 *
 */

import Blockly from "blockly/core";

const defaultBlockStyles = {
  colour_blocks: {
    colourPrimary: "var(--theme-color--brand)",
    colourSecondary: "var(--theme-color--accent)",
    colourTertiary: "var(--theme-color--pop)",
  },
  list_blocks: {
    colourPrimary: "var(--theme-color--brand)",
    colourSecondary: "#AD7BE9",
    colourTertiary: "#CDB6E9",
  },
  logic_blocks: {
    colourPrimary: "var(--theme-color--brand)",
    colourSecondary: "#64C7FF",
    colourTertiary: "#C5EAFF",
  },
  loop_blocks: {
    colourPrimary: "var(--theme-color--brand)",
    colourSecondary: "#9AFF78",
    colourTertiary: "#E1FFD7",
  },
  math_blocks: {
    colourPrimary: "var(--theme-color--brand)",
    colourSecondary: "#8A9EFF",
    colourTertiary: "#DCE2FF",
  },
  procedure_blocks: {
    colourPrimary: "var(--theme-color--brand)",
    colourSecondary: "#77E6EE",
    colourTertiary: "#CFECEE",
  },
  text_blocks: {
    colourPrimary: "var(--theme-color--brand)",
    colourSecondary: "#5ae27c",
    colourTertiary: "#D2FFDD",
  },
  variable_blocks: {
    colourPrimary: "var(--theme-color--brand)",
    colourSecondary: "#FF73BE",
    colourTertiary: "#FFD4EB",
  },
  variable_dynamic_blocks: {
    colourPrimary: "var(--theme-color--brand)",
    colourSecondary: "#FF73BE",
    colourTertiary: "#FFD4EB",
  },
  hat_blocks: {
    colourPrimary: "#880e4f",
    colourSecondary: "#FF73BE",
    colourTertiary: "#FFD4EB",
    hat: "cap",
  },
};

const categoryStyles = {
  colour_category: { colour: "var(--theme-color--brand)" },
  list_category: { colour: "var(--theme-color--brand)" },
  logic_category: { colour: "var(--theme-color--brand)" },
  loop_category: { colour: "var(--theme-color--brand)" },
  math_category: { colour: "var(--theme-color--brand)" },
  procedure_category: { colour: "var(--theme-color--brand)" },
  text_category: { colour: "var(--theme-color--brand)" },
  variable_category: { colour: "var(--theme-color--brand)" },
  variable_dynamic_category: { colour: "var(--theme-color--brand)" },
};

// Temporarily required to ensure there's no conflict with
// Blockly.Themes.HighContrast
// Blockly.registry.unregister("theme", "highcontrast");

/**
 * High contrast theme.
 */
export default Blockly.Theme.defineTheme("highcontrast", {
  blockStyles: defaultBlockStyles,
  categoryStyles: categoryStyles,
  componentStyles: {
    selectedGlowColour: "#000000",
    selectedGlowSize: 1,
    replacementGlowColour: "#000000",
  },
  fontStyle: {
    family: "var(--theme-font-display)", // Use default font-family.
    weight: null, // Use default font-weight.
    size: 16,
  },
  startHats: null,
});
