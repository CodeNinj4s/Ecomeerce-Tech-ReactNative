import { DefaultTheme } from "@react-navigation/native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");


export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        text: "#222222",
        primary: "#0667C0",
        secondary: "#DB3022",
        error: "#D8D2CB",
        terciario: "#e0dfde",
        background: "#F9F9F9"
    },
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};