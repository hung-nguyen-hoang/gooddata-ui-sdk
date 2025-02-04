// (C) 2022 GoodData Corporation
import React from "react";
import { action } from "@storybook/addon-actions";
import { CodeArea } from "@gooddata/sdk-ui-kit";

import { storiesOf } from "../../../_infra/storyRepository";
import { UiKit } from "../../../_infra/storyGroups";
import { wrapWithTheme } from "../../themeWrapper";

import { code } from "./CodeMock";
const AreaWrapper: React.FC = (props) => {
    const { children } = props;
    return <div style={{ width: 600, height: 250, margin: 20 }}>{children}</div>;
};

/**
 * @internal
 */
export const CodeAreaExamples: React.VFC = () => {
    return (
        <>
            <div className="screenshot-target">
                <div className="library-component">
                    <h4>Code area</h4>
                </div>
                <AreaWrapper>
                    <CodeArea code={code} onCopyCode={action("onCopyCode")} />
                </AreaWrapper>
            </div>
            <div className="screenshot-target">
                <div className="library-component">
                    <h4>Scrollable code area</h4>
                </div>
                <AreaWrapper>
                    <CodeArea code={code + code + code} onCopyCode={action("onCopyCode")} />
                </AreaWrapper>
            </div>
            <div className="screenshot-target">
                <div className="library-component">
                    <h4>Empty code area</h4>
                </div>
                <AreaWrapper>
                    <CodeArea code={""} onCopyCode={action("onCopyCode")} />
                </AreaWrapper>
            </div>
        </>
    );
};

storiesOf(`${UiKit}/EmbedInsightDialog/CodeArea`)
    .add("full-featured", () => <CodeAreaExamples />, { screenshot: true })
    .add("themed", () => wrapWithTheme(<CodeAreaExamples />), { screenshot: true });
