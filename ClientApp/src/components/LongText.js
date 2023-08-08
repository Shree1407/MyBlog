import React, { useState } from "react";

const LongText = ({ content, limit }) => {
    const [showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false);

    if (content.length <= limit) {
        // there is nothing more to show
        return <div>{content}</div>
    }
    if (showAll) {
        // We show the extended text and a link to reduce it
        return <div>
            {content}
            <span style={{ color: "darkolivegreen", fontWeight: "bold" }} onClick={showLess}>Read less</span>
        </div>
    }
    // In the final case, we show a text with ellipsis and a `Read more` button
    const toShow = content.substring(0, limit) + "...";
    return <div>
        {toShow}
        <span style={{ color: "darkolivegreen", fontWeight: "bold" }} onClick={showMore}>Read more</span>
    </div>
}

export default LongText;