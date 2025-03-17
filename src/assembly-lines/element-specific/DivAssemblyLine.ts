import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";


/**
 * A BasicAssemblyLine for the `<div>` element.
 */
export default class DivAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLDivElement, P> {

    public override copy(): DivAssemblyLine<P> {
        return new DivAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLDivElement, P>[] = []) {
        super(() => document.createElement("div"), defaultParameters, steps);
    }

    /**
     * Adds a step that makes the div a flexbox.
     * @returns FlexDivAssemblyLine with the same steps as `this`
     */
    public flex() {
        this.classes("flex");
        return new FlexDivAssemblyLine(this.defaultParameters, this.steps);
    }

    /**
     * Adds a step that makes the div a row flexbox.
     * @returns FlexRowsDivAssemblyLine with the same steps as `this`
     */
    public flexRows() {
        this.classes("rows");
        return new FlexRowsDivAssemblyLine(this.defaultParameters, this.steps);
    }

    /**
     * Adds a step that makes the div a column flexbox.
     * @returns FlexRowsDivAssemblyLine with the same steps as `this`
     */
    public flexColumns() {
        this.classes("columns");
        return new FlexColumnsDivAssemblyLine(this.defaultParameters, this.steps);
    }

}



class FlexDivAssemblyLine<P extends AssemblyLine.Parameters> extends DivAssemblyLine<P> {

    public override copy(): FlexDivAssemblyLine<P> {
        return new FlexDivAssemblyLine(this.defaultParameters, [...this.steps])
    }

    /**
     * Adds a step that determines the spacing between children.
     * @param spacing value provider
     */
    public spacing(spacing: AssemblyLine.DynamicValue.Either<FlexDivAssemblyLine.Spacing>) {
        return this.classes((e, params) => AssemblyLine.DynamicValue.resolve(spacing, e, params));
    }

    /**
     * Adds a step that determines whether the flexbox wraps around.
     * @param doWrap value provider
     */
    public wrapItems(doWrap: AssemblyLine.DynamicValue.Either<boolean>) {
        return this.classes((e, params) => AssemblyLine.DynamicValue.resolve(doWrap, e, params) ? "wrap" : "no-wrap");
    }

}

namespace FlexDivAssemblyLine {

    export type Spacing =
        "centered" |
        "evenly-spaced" |
        "between-spaced" |
        "around-spaced";

}



class FlexRowsDivAssemblyLine<P extends AssemblyLine.Parameters> extends FlexDivAssemblyLine<P> {

    /**
     * Adds a step that determines the vertical item alignment.
     * @param itemAlignment value provider
     */
    public alignItems(itemAlignment: AssemblyLine.DynamicValue.Either<FlexRowsDivAssemblyLine.ItemAlignment>) {
        return this.classes((e, params) => AssemblyLine.DynamicValue.resolve(itemAlignment, e, params));
    }

    /**
     * Adds a step that determines the vertical content alignment
     * @param contentAlignment value provider
     */
    public alignContent(contentAlignment: AssemblyLine.DynamicValue.Either<FlexRowsDivAssemblyLine.ContentAlignment>) {
        return this.classes((e, params) => AssemblyLine.DynamicValue.resolve(contentAlignment, e, params));
    }

}

namespace FlexRowsDivAssemblyLine {

    export type ItemAlignment =
        "align-left" |
        "align-center" |
        "align-right" |
        "align-baseline" |
        "align-stretch";

    export type ContentAlignment =
        "left-content" |
        "center-content" |
        "right-content" |
        "stretch-content" |
        "evenly-space-content" |
        "between-space-content" |
        "around-space-content";

}



class FlexColumnsDivAssemblyLine<P extends AssemblyLine.Parameters> extends FlexDivAssemblyLine<P> {

    /**
     * Adds a step that determines the horizontal item alignment.
     * @param itemAlignment value provider
     */
    public alignItems(itemAlignment: AssemblyLine.DynamicValue.Either<FlexColumnsDivAssemblyLine.ItemAlignment>) {
        return this.classes((e, params) => AssemblyLine.DynamicValue.resolve(itemAlignment, e, params));
    }

    /**
     * Adds a step that determines the horizontal content alignment.
     * @param contentAlignment value provider
     */
    public alignContent(contentAlignment: AssemblyLine.DynamicValue.Either<FlexColumnsDivAssemblyLine.ContentAlignment>) {
        return this.classes((e, params) => AssemblyLine.DynamicValue.resolve(contentAlignment, e, params));
    }

}

namespace FlexColumnsDivAssemblyLine {

    export type ItemAlignment =
        "align-top" |
        "align-center" |
        "align-bottom" |
        "align-baseline" |
        "align-stretch";

    export type ContentAlignment =
        "top-content" |
        "center-content" |
        "bottom-content" |
        "stretch-content" |
        "evenly-space-content" |
        "between-space-content" |
        "around-space-content";

}