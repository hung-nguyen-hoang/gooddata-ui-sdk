// (C) 2023 GoodData Corporation
import { useCallback, useState } from "react";
import { DashboardAttributeFilterSelectionMode, IDashboardAttributeFilter } from "@gooddata/sdk-model";
import {
    useDashboardCommandProcessing,
    setAttributeFilterSelectionMode,
    changeAttributeFilterSelection,
    useDashboardSelector,
    selectSettings,
} from "../../../../../../model";

export const useSelectionModeConfiguration = (attributeFilter: IDashboardAttributeFilter) => {
    const { run: changeSelectionMode } = useDashboardCommandProcessing({
        commandCreator: setAttributeFilterSelectionMode,
        successEvent: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_MODE_CHANGED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
    });

    const { run: changeSelection } = useDashboardCommandProcessing({
        commandCreator: changeAttributeFilterSelection,
        successEvent: "GDC.DASH/EVT.FILTER_CONTEXT.ATTRIBUTE_FILTER.SELECTION_CHANGED",
        errorEvent: "GDC.DASH/EVT.COMMAND.FAILED",
    });

    const { enableSingleSelectionFilter } = useDashboardSelector(selectSettings);

    const originalSelectionMode = attributeFilter.attributeFilter.selectionMode ?? "multi";
    const [selectionMode, setSelectionMode] =
        useState<DashboardAttributeFilterSelectionMode>(originalSelectionMode);
    const selectionModeChanged = originalSelectionMode !== selectionMode;

    const onSelectionModeUpdate = useCallback(
        (value: DashboardAttributeFilterSelectionMode) => {
            if (!enableSingleSelectionFilter) {
                return;
            }
            setSelectionMode(value);
        },
        [enableSingleSelectionFilter],
    );

    const onConfigurationClose = useCallback(() => {
        if (!enableSingleSelectionFilter) {
            return;
        }
        setSelectionMode(originalSelectionMode);
    }, [originalSelectionMode, enableSingleSelectionFilter]);

    const onSelectionModeChange = useCallback(() => {
        if (!enableSingleSelectionFilter) {
            return;
        }
        if (selectionMode === originalSelectionMode) {
            return;
        }
        const { localIdentifier } = attributeFilter.attributeFilter;
        if (selectionMode === "single") {
            // the order is important to keep Dashboard in valid state
            changeSelection(localIdentifier!, { uris: [] }, "IN");
            changeSelectionMode(localIdentifier!, selectionMode);
        } else {
            // the order is important to keep Dashboard in valid state
            changeSelectionMode(localIdentifier!, selectionMode);
            changeSelection(localIdentifier!, { uris: [] }, "NOT_IN");
        }
    }, [
        enableSingleSelectionFilter,
        originalSelectionMode,
        selectionMode,
        attributeFilter,
        changeSelectionMode,
        changeSelection,
    ]);

    return {
        selectionMode,
        selectionModeChanged,
        onSelectionModeChange,
        onSelectionModeUpdate,
        onConfigurationClose,
    };
};
