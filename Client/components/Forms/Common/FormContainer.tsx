import { IParentComponentProps } from "@stego/interfaces/IParentComponentProps";
import React from "react";
import { Box } from "@mui/material";

type FormContainerProps = IParentComponentProps;
const FormContainerComponent = ({ children }: FormContainerProps): React.ReactElement => {
    return <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>{children}</Box>;
};

export const FormContainer = React.memo(FormContainerComponent);
