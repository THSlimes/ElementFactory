import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

export default abstract class TableCellAssemblyLine<E extends HTMLTableCellElement, P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLTableCellElement, P> {

    public abbreviation(abbreviation: AssemblyLine.DynamicValue.Either<string, HTMLTableCellElement, P>) {
        return this.addStep((e, params) => e.abbr = String(AssemblyLine.DynamicValue.resolve(abbreviation, e, params)));
    }

    /**
     * Adds a step to set the height (in number of rows).
     * @param rowSpan value provider
     */
    public rowSpan(rowSpan: AssemblyLine.DynamicValue.Either<number, HTMLTableCellElement, P>) {
        return this.addStep((e, params) => e.rowSpan = Math.max(1, AssemblyLine.DynamicValue.resolve(rowSpan, e, params)));
    }

    /**
     * Adds a step to set the width (in number of columns).
     * @param columnSpan value provider
     */
    public columnSpan(columnSpan: AssemblyLine.DynamicValue.Either<number, HTMLTableCellElement, P>) {
        return this.addStep((e, params) => e.colSpan = Math.max(1, AssemblyLine.DynamicValue.resolve(columnSpan, e, params)));
    }

}