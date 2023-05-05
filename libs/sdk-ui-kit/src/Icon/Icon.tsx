// (C) 2021-2023 GoodData Corporation

import { IIconProps } from "./typings";

import { Book } from "./icons/Book";
import { Lock } from "./icons/Lock";
import { Refresh } from "./icons/Refresh";
import { DrillDown } from "./icons/DrillDown";
import { DrillToDashboard } from "./icons/DrillToDashboard";
import { DrillToInsight } from "./icons/DrillToInsight";
import { Date } from "./icons/Date";
import { Explore } from "./icons/Explore";
import { Logout } from "./icons/Logout";
import { Pdf } from "./icons/Pdf";
import { ExternalLink } from "./icons/ExternalLink";
import { Hyperlink } from "./icons/Hyperlink";
import { Undo } from "./icons/Undo";
import { Home } from "./icons/Home";
import { BurgerMenu } from "./icons/BurgerMenu";
import { Rows, IRowsIconProps } from "./icons/Rows";
import { DragHandle } from "./icons/DragHandle";
import { Interaction } from "./icons/Interaction";
import { AttributeFilter } from "./icons/AttributeFilter";
import { LegendMenu } from "./icons/LegendMenu";
import { ArrowDown } from "./icons/ArrowDown";
import { ArrowUp } from "./icons/ArrowUp";
import { Attribute } from "./icons/Attribute";
import { Close } from "./icons/Close";
import { Dataset } from "./icons/Dataset";
import { Expand } from "./icons/Expand";
import { Contract } from "./icons/Contract";
import { Fact } from "./icons/Fact";
import { Function } from "./icons/Function";
import { Insight } from "./icons/Insight";
import { Keyword } from "./icons/Keyword";
import { Label } from "./icons/Label";
import { Metric } from "./icons/Metric";
import { QuestionMark } from "./icons/QuestionMark";
import { Minimize } from "./icons/Minimize";
import { Dashboard } from "./icons/Dashboard";
import { Many } from "./icons/Many";
import { SettingsGear } from "./icons/SettingsGear";
import { AttachmentClip } from "./icons/AttachmentClip";
import { Error } from "./icons/Error";
import { Aborted } from "./icons/Aborted";
import { Progress } from "./icons/Progress";
import { Success } from "./icons/Success";
import { Table } from "./icons/InsightIcons/Table";
import { Column } from "./icons/InsightIcons/Column";
import { Bar } from "./icons/InsightIcons/Bar";
import { Line } from "./icons/InsightIcons/Line";
import { StackedArea } from "./icons/InsightIcons/StackedArea";
import { Combo } from "./icons/InsightIcons/Combo";
import { HeadlineChart } from "./icons/InsightIcons/HeadlineChart";
import { ScatterPlot } from "./icons/InsightIcons/ScatterPlot";
import { Bubble } from "./icons/InsightIcons/Bubble";
import { Pie } from "./icons/InsightIcons/Pie";
import { Donut } from "./icons/InsightIcons/Donut";
import { TreeMap } from "./icons/InsightIcons/TreeMap";
import { HeatMap } from "./icons/InsightIcons/HeatMap";
import { Bullet } from "./icons/InsightIcons/Bullet";
import { Geo } from "./icons/InsightIcons/Geo";
import { Waterfall } from "./icons/InsightIcons/Waterfall";
import { EmbedCodeIcon } from "./icons/EmbedCodeIcon";
import { Origin } from "./icons/Origin";
import { Token } from "./icons/Token";
import { Leave } from "./icons/Leave";
import { Copy } from "./icons/Copy";
import { Run } from "./icons/Run";
import { Invite } from "./icons/Invite";

/**
 * @internal
 */
export const Icon: Record<string, React.FC<IIconProps>> = {
    Book,
    Refresh,
    DrillDown,
    DrillToDashboard,
    DrillToInsight,
    Date,
    Explore,
    Logout,
    Lock,
    Pdf,
    ExternalLink,
    Hyperlink,
    Undo,
    Home,
    BurgerMenu,
    Rows,
    DragHandle,
    Interaction,
    AttributeFilter,
    LegendMenu,
    ArrowDown,
    ArrowUp,
    Attribute,
    Close,
    Dataset,
    Expand,
    Contract,
    Fact,
    Function,
    Insight,
    Keyword,
    Label,
    Metric,
    QuestionMark,
    Minimize,
    Dashboard,
    Many,
    SettingsGear,
    AttachmentClip,
    Table,
    Column,
    Bar,
    Line,
    StackedArea,
    Combo,
    HeadlineChart,
    ScatterPlot,
    Bubble,
    Pie,
    Donut,
    TreeMap,
    HeatMap,
    Bullet,
    Geo,
    Waterfall,
    EmbedCodeIcon,
    Error,
    Aborted,
    Progress,
    Success,
    Token,
    Origin,
    Leave,
    Copy,
    Run,
    Invite,
};

export { IRowsIconProps };
