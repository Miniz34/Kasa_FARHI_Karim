import { ReactNode, useState, createContext } from "react";
import { useCookies } from "react-cookie";

/**
 * Props interface for the DisplayModal component.
 *
 * @interface UpdateContextProps
 * @member {number} [delay=0] - The delay in milliseconds before the modal is displayed.
 * @member {string} [mode=""] - The mode of the modal, can be one of "info", "error", "warning", or an empty string.
 * @member {string} [title=""] - The title to be displayed in the modal.
 * @member {number} [height=""] - The title to be displayed in the modal.
 * @member {number} [width=""] - The title to be displayed in the modal.
 * @member {string} [color=""] - The title to be displayed in the modal.
 * @member {string} [textColor=""] - The title to be displayed in the modal.
 * @member {string} [modalPosition=""] - The position of the modal on the screen, 5 possible options : "center", "top-left", "top-right", "bottom-left", "bottom-right"
 * @member {string} [backgroundColor=""] - The background color of the modal, specified as a CSS color string (e.g., "#ffffff", "rgba(255, 0, 0, 0.5)", etc.).
 * @member {string} [backgroundColorTitle=""] - The background color of the modal title area, specified as a CSS color string.
 * @member {string} [textColor=""] - The text color of the modal content, specified as a CSS color string.
 * @member {string} [closePosition=""] - The position of the close button within the modal, specified as a CSS string, 4 possible options : "right", "left", "outside-right", "outside-left"
 * @member {string} [borderRadius=""] - The border radius of the modal, specified as a CSS string (e.g., "4px", "50%", etc.).
 * @member {string} [boxShadow=""] - The box shadow of the modal, specified as a CSS string (e.g., "0 2px 4px rgba(0, 0, 0, 0.2)", "inset 0 1px 2px #ccc", etc.).
 * @member {string} [border=""] - The border of the modal, specified as a CSS string (e.g., "1px solid #ccc", "2px dashed red", etc.).
 * @member {string} [borderInside=""] - The border inside the modal, specified as a CSS string (e.g., "1px solid #ccc", "2px dashed red", etc.).
 * @member {string} [orientation=""] - The orientation of the modal, specified as a CSS string (e.g., "row").
 *
 *
 * @member {ReactNode | null} [children=null] - The content to be rendered inside the modal. It can be React elements or null.
 * @member {string} [className=""] - Additional CSS class name(s) to be applied to the modal container.
 * @member {function | null} [onClosed=null] - A function to be called when the modal has been closed.
 * @member {boolean | null} [onClose=null] - A function to be called when the close button is clicked.
 *                                                   Return `true` to close the modal, `false` to keep it open.
 * @member {boolean} [enableFadeIn=false] - If `true`, the modal will fade in when displayed.
 * @member {boolean} [enableFadeOut=false] - If `true`, the modal will fade out when closed.
 */

export interface UpdateContextProps {
  darkTheme?: boolean;
  jwToken?: string;
  userId?: string;
}

/**
 * Props interface for the ModalContext component.
 *
 * @interface HomiContextProps
 * @property {boolean} open - Indicates whether the modal is currently open or closed.
 * @property {number} delay - The delay in milliseconds before the modal is displayed.
 * @property {string} mode - The mode of the modal, can be one of "info", "error", "warning", or an empty string.
 * @property {string} title - The title to be displayed in the modal.
 * @property {ReactNode | null} subChildren - Additional children to be rendered inside the modal.
 *                                             It can be React elements or null.
 * @property {function | null} onClosed - A function to be called when the modal has been closed.
 * @property {boolean | null} onClose - A function to be called when the close button is clicked.
 *                                              Return `true` to close the modal, `false` to keep it open.
 * @property {boolean} enableFadeIn - If `true`, the modal will fade in when displayed.
 * @property {boolean} enableFadeOut - If `true`, the modal will fade out when closed.
 * @property {(props: DisplayModalProps) function} DisplayModal - A function to trigger the display of a modal
 *                                                               with the provided props.
 * @property {function} CloseModal - A function to close the currently open modal.
 * * @property {string} modalPosition - The position of the modal on the screen, 5 possible options : "center", "top-left", "top-right", "bottom-left", "bottom-right"
 * @property {number | string} height - The height of the modal, specified as a number (in pixels) or a CSS string (e.g., "50%", "200px", etc.).
 * @property {number | string} width - The width of the modal, specified as a number (in pixels) or a CSS string (e.g., "50%", "300px", etc.).
 * @property {string} backgroundColor - The background color of the modal, specified as a CSS color string (e.g., "#ffffff", "rgba(255, 0, 0, 0.5)", etc.).
 * @property {string} backgroundColorTitle - The background color of the modal title area, specified as a CSS color string.
 * @property {string} textColor - The text color of the modal content, specified as a CSS color string.
 * @property {string} closePosition - The position of the close button within the modal, specified as a CSS string, 4 possible options : "right", "left", "outside-right", "outside-left"
 * @property {string} borderRadius - The border radius of the modal, specified as a CSS string (e.g., "4px", "50%", etc.).
 * @property {string} boxShadow - The box shadow of the modal, specified as a CSS string (e.g., "0 2px 4px rgba(0, 0, 0, 0.2)", "inset 0 1px 2px #ccc", etc.).
 * @property {string} border - The border of the modal, specified as a CSS string (e.g., "1px solid #ccc", "2px dashed red", etc.).
 * @property {string} borderInside - The border inside the modal, specified as a CSS string (e.g., "1px solid #ccc", "2px dashed red", etc.).
 * @property {string} orientation - The orientation of the modal, specified as a CSS string (e.g., "row").
 */
interface HomiContextProps {
  darkTheme: boolean;
  jwToken: string;
  userId: string;
  UpdateContext: (props: UpdateContextProps) => void;
}

const initialState: HomiContextProps = {
  darkTheme: false,
  jwToken: "",
  userId: "",
  UpdateContext: () => {
    return;
  },
};
export const HomiContext = createContext<HomiContextProps>(initialState);

interface HomiProviderProps {
  children?: ReactNode | null | undefined;
}
const HomiProvider = ({ children }: HomiProviderProps) => {
  // const [cookies, setCookie] = useCookies(["darkTheme", "userId", "jwToken"]);

  const UpdateContext = (props: UpdateContextProps) => {
    setState((prevState) => ({
      ...prevState, // Preserve the previous state
      darkTheme:
        typeof props.darkTheme !== "undefined"
          ? props.darkTheme
          : prevState.darkTheme,
      jwToken:
        typeof props.jwToken !== "undefined"
          ? props.jwToken
          : prevState.jwToken,
      userId:
        typeof props.userId !== "undefined" ? props.userId : prevState.userId,
    }));

    // Update the cookies with the new context values
    // setCookie("darkTheme", props.darkTheme ? "true" : "false");
    // setCookie("userId", props.userId || "");
    // setCookie("jwToken", props.jwToken || "");
  };
  const [state, setState] = useState<HomiContextProps>({
    darkTheme: false,
    jwToken: "",
    userId: "",
    UpdateContext: UpdateContext, // Include the function here
  });

  return (
    <HomiContext.Provider value={{ ...state, UpdateContext }}>
      {children ?? null}
    </HomiContext.Provider>
  );
};

export default HomiProvider;
