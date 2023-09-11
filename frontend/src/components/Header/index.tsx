import React from "react";

import _ from "lodash";
import Image from "next/image";

const Header = ({}) => {
    return (
        <>
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/next.svg"
                alt="Next.js Logo"
                width={180}
                height={37}
                priority
            />
        </>
    );
};

export default Header;
