import React from "react";
import NextLink from "next/link";
import MUILink from "@mui/material/Link";
import { IParentComponentProps } from "@stego/interfaces/IParentComponentProps";

interface ILinkProps extends IParentComponentProps {
    href: string;
}

const LinkComponent = ({ href, children }: ILinkProps): React.ReactElement => {
    return (
        <MUILink component={NextLink} href={href} underline="none">
            {children}
        </MUILink>
    );
};

export const Link = React.memo(LinkComponent);
