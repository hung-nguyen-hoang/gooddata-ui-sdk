// (C) 2019-2023 GoodData Corporation
import React from "react";
import { Button } from "@gooddata/sdk-ui-kit";
import { AttributeFilterConfigurationButton, AttributeFilterDeleteButton } from "@gooddata/sdk-ui-filters";
import {
    areObjRefsEqual,
    DashboardAttributeFilterSelectionMode,
    IAttributeMetadataObject,
    isAttributeMetadataObject,
    ObjRef,
} from "@gooddata/sdk-model";
import invariant from "ts-invariant";
import {
    selectAllCatalogAttributesMap,
    selectAttributeFilterDisplayFormsMap,
    selectFilterContextAttributeFilters,
    selectIsAlternativeDisplayFormSelectionEnabled,
    selectIsDeleteFilterButtonEnabled,
    selectIsInEditMode,
    selectIsKPIDashboardDependentFiltersEnabled,
    selectSettings,
    useDashboardSelector,
} from "../../../model";

function useIsConfigButtonVisible(filterDisplayFormRef: ObjRef, attributes?: IAttributeMetadataObject[]) {
    const isEditMode = useDashboardSelector(selectIsInEditMode);
    const { enableKPIAttributeFilterRenaming, enableSingleSelectionFilter } =
        useDashboardSelector(selectSettings);
    const allAttributeFilters = useDashboardSelector(selectFilterContextAttributeFilters);

    const isDependentFiltersEnabled = useDashboardSelector(selectIsKPIDashboardDependentFiltersEnabled);
    const isDisplayFormSelectionEnabled = useDashboardSelector(
        selectIsAlternativeDisplayFormSelectionEnabled,
    );

    const dfMap = useDashboardSelector(selectAttributeFilterDisplayFormsMap);
    const filterDisplayForm = dfMap.get(filterDisplayFormRef);
    invariant(filterDisplayForm);

    const attributesMap = useDashboardSelector(selectAllCatalogAttributesMap);
    if (!attributes) {
        return false;
    }

    const attributeByDisplayForm = attributes?.find((attribute) =>
        areObjRefsEqual(attribute.ref, filterDisplayForm.attribute),
    );

    const filterAttribute = attributesMap.get(filterDisplayForm.attribute) || attributeByDisplayForm;
    invariant(filterAttribute);

    const hasMultipleDisplayForms = isAttributeMetadataObject(filterAttribute)
        ? filterAttribute.displayForms.length > 1
        : filterAttribute.attribute.displayForms.length > 1;

    const canConfigureDependentFilters = isDependentFiltersEnabled && allAttributeFilters.length > 1;
    const canConfigureDisplayForm = isDisplayFormSelectionEnabled && hasMultipleDisplayForms;

    return (
        isEditMode &&
        (canConfigureDependentFilters ||
            canConfigureDisplayForm ||
            enableKPIAttributeFilterRenaming ||
            enableSingleSelectionFilter)
    );
}

/**
 * @internal
 */
export interface ICustomAttributeFilterDropdownActionsProps {
    onApplyButtonClick: () => void;
    onCancelButtonClick: () => void;
    onConfigurationButtonClick: () => void;
    onDeleteButtonClick: () => void;
    isApplyDisabled?: boolean;
    cancelText: string;
    applyText: string;
    filterDisplayFormRef: ObjRef;
    attributes?: IAttributeMetadataObject[];
    filterSelectionMode?: DashboardAttributeFilterSelectionMode;
}

/**
 * @internal
 */
export const CustomAttributeFilterDropdownActions: React.FC<ICustomAttributeFilterDropdownActionsProps> = ({
    isApplyDisabled,
    onApplyButtonClick,
    onCancelButtonClick,
    onConfigurationButtonClick,
    onDeleteButtonClick,
    cancelText,
    applyText,
    filterDisplayFormRef,
    attributes,
    filterSelectionMode,
}) => {
    const isEditMode = useDashboardSelector(selectIsInEditMode);
    const isDeleteButtonEnabled = useDashboardSelector(selectIsDeleteFilterButtonEnabled);
    const isConfigButtonVisible = useIsConfigButtonVisible(filterDisplayFormRef, attributes);

    const { enableSingleSelectionFilter } = useDashboardSelector(selectSettings);
    const isSingleSelect = enableSingleSelectionFilter && filterSelectionMode === "single";

    if (!isEditMode && isSingleSelect) {
        return null;
    }

    return (
        <div className="gd-attribute-filter-dropdown-actions__next">
            <div className="gd-attribute-filter-dropdown-actions-left-content__next">
                {isEditMode && isDeleteButtonEnabled ? (
                    <>
                        <AttributeFilterDeleteButton onDelete={onDeleteButtonClick} />
                        <div className="gd-button-separator" />
                    </>
                ) : null}
                {isConfigButtonVisible ? (
                    <AttributeFilterConfigurationButton onConfiguration={onConfigurationButtonClick} />
                ) : null}
            </div>
            {!isSingleSelect ? (
                <div className="gd-attribute-filter-dropdown-actions-right-content__next">
                    <Button
                        className="gd-attribute-filter-cancel-button__next gd-button-secondary gd-button-small cancel-button s-cancel"
                        onClick={onCancelButtonClick}
                        value={cancelText}
                        title={cancelText}
                    />
                    <Button
                        disabled={isApplyDisabled}
                        className="gd-attribute-filter-apply-button__next gd-button-action gd-button-small s-apply"
                        onClick={onApplyButtonClick}
                        value={applyText}
                        title={applyText}
                    />
                </div>
            ) : null}
        </div>
    );
};

/**
 * @internal
 */
export interface ICustomConfigureAttributeFilterDropdownActionsProps {
    onSaveButtonClick: () => void;
    onCancelButtonClick: () => void;
    isSaveDisabled?: boolean;
    cancelText: string;
    saveText: string;
}

/**
 * @internal
 */
export const CustomConfigureAttributeFilterDropdownActions: React.FC<
    ICustomConfigureAttributeFilterDropdownActionsProps
> = ({ isSaveDisabled, onSaveButtonClick, onCancelButtonClick, cancelText, saveText }) => {
    return (
        <div className="gd-attribute-filter-dropdown-actions__next">
            <div className="gd-attribute-filter-dropdown-actions-left-content__next" />
            <div className="gd-attribute-filter-dropdown-actions-right-content__next">
                <Button
                    className="gd-attribute-filter-cancel-button__next gd-button-secondary gd-button-small cancel-button s-cancel"
                    onClick={onCancelButtonClick}
                    value={cancelText}
                    title={cancelText}
                />
                <Button
                    disabled={isSaveDisabled}
                    className="gd-attribute-filter-apply-button__next gd-button-action gd-button-small s-apply"
                    onClick={onSaveButtonClick}
                    value={saveText}
                    title={saveText}
                />
            </div>
        </div>
    );
};
