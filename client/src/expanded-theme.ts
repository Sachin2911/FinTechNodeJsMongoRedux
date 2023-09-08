// eslint-disable-next-line
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette"{
    // Extending for the theme things defined
    interface PaletteColor{
        [key:number]:string;
    }

    interface Palette{
        tertiary: PaletteColor;
    }
}