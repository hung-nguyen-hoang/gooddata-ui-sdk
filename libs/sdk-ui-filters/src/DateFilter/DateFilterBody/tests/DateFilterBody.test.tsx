// (C) 2019-2023 GoodData Corporation
import React from "react";
import { render, screen } from "@testing-library/react";
import { DEFAULT_DATE_FORMAT } from "../../constants/Platform";
import { DateFilterBody, IDateFilterBodyProps } from "../DateFilterBody";
import {
    DateFilterButtonLocalized,
    IDateFilterButtonLocalizedProps,
} from "../../DateFilterButtonLocalized/DateFilterButtonLocalized";
import { IAllTimeDateFilterOption } from "@gooddata/sdk-model";
import { withIntl } from "@gooddata/sdk-ui";

describe("ExtendedDateFilterBody", () => {
    const allTime: IAllTimeDateFilterOption = {
        type: "allTime",
        localIdentifier: "ALL_TIME",
        name: "",
        visible: true,
    };

    const createDateFilterButton = (props?: IDateFilterButtonLocalizedProps) => {
        const defaultProps: IDateFilterButtonLocalizedProps = {
            isMobile: false,
            dateFilterOption: allTime,
            dateFormat: DEFAULT_DATE_FORMAT,
        };
        return <DateFilterButtonLocalized {...defaultProps} {...props} />;
    };

    const renderDateFilterBody = (props?: Partial<IDateFilterBodyProps>) => {
        const mockProps: IDateFilterBodyProps = {
            filterOptions: {},
            dateFilterButton: createDateFilterButton(),
            dateFormat: DEFAULT_DATE_FORMAT,
            selectedFilterOption: allTime,
            onSelectedFilterOptionChange: jest.fn(),

            excludeCurrentPeriod: false,
            isExcludeCurrentPeriodEnabled: false,
            onExcludeCurrentPeriodChange: jest.fn(),

            availableGranularities: [],
            isEditMode: false,
            isMobile: false,
            isTimeForAbsoluteRangeEnabled: true,

            onApplyClick: jest.fn(),
            onCancelClick: jest.fn(),
            closeDropdown: jest.fn(),
        };
        const Wrapped = withIntl(DateFilterBody);
        return render(<Wrapped {...mockProps} {...props} />);
    };

    it("should pass the isExcludeCurrentPeriodEnabled=true to Exclude button", () => {
        renderDateFilterBody({ isExcludeCurrentPeriodEnabled: true });
        expect(screen.getByRole("checkbox", { name: "Exclude open period" })).not.toBeDisabled();
    });

    it("should pass the isExcludeCurrentPeriodEnabled=false to Exclude button", () => {
        renderDateFilterBody({ isExcludeCurrentPeriodEnabled: false });
        expect(screen.getByRole("checkbox", { name: "Exclude open period" })).toBeDisabled();
    });

    it("should display edit mode message in edit mode", () => {
        renderDateFilterBody({ isEditMode: true });
        expect(screen.queryByText("Set default date filter for viewers:")).toBeInTheDocument();
    });

    it("should not display edit mode message in normal mode", () => {
        renderDateFilterBody({ isEditMode: false });
        expect(screen.queryByText("Set default date filter for viewers:")).not.toBeInTheDocument();
    });

    describe("calculateHeight", () => {
        const resizeWindow = (x: number, y: number) => {
            (window.innerWidth as number) = x;
            (window.innerHeight as number) = y;
        };

        const getBodyWrapper = () => {
            return document.querySelector(".gd-extended-date-filter-body-wrapper");
        };

        const getBodyScroller = () => {
            return document.querySelector(".gd-extended-date-filter-body-scrollable");
        };

        it("should not resize body wrapper and scroller", () => {
            renderDateFilterBody({ isEditMode: false });
            expect(getBodyWrapper()).not.toHaveAttribute("style");
            expect(getBodyScroller()).not.toHaveAttribute("style");
        });

        it("should resize body wrapper and scroller in horizontal mobile layout", () => {
            resizeWindow(896, 414);
            renderDateFilterBody({ isEditMode: false });
            expect(getBodyWrapper()).toHaveStyle("display: block; height: 323px");
            expect(getBodyScroller()).toHaveStyle("min-height: 323px");
        });
    });
});
