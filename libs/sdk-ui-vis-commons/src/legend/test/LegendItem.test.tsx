// (C) 2007-2023 GoodData Corporation
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import LegendItem from "../LegendItem";

describe("LegendItem", () => {
    const item = {
        name: "Foo",
        color: "red",
        isVisible: true,
    };

    function createComponent(props: any = {}) {
        return render(<LegendItem {...props} />);
    }

    it("should render item", () => {
        const props = {
            item,
            chartType: "bar",
            onItemClick: jest.fn(),
        };
        createComponent(props);
        const legendItem = screen.getByText("Foo");

        expect(legendItem).toBeInTheDocument();
        fireEvent.click(legendItem);
        expect(props.onItemClick).toHaveBeenCalled();
    });

    it.each([
        ["enable", true, "50%"],
        ["enable", false, "0"],
    ])(
        "should %s border radius for %s chart with itemType=%s",
        (_des: string, enableBorderRadius: boolean, expected: string) => {
            const props = {
                item: {
                    ...item,
                },
                enableBorderRadius,
            };
            createComponent(props);

            expect(screen.getByLabelText("Legend item")).toHaveStyle(`
                background-color: red
                border-radius: ${expected}
            `);
        },
    );
});
