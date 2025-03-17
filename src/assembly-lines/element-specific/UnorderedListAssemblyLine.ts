import AssemblyLine from "../AssemblyLine";
import BasicAssemblyLine from "../BasicAssemblyLine";

/**
 * A BasicAssemblyLine for the `<ul>` element.
 */
class UnorderedListAssemblyLine<P extends AssemblyLine.Parameters> extends BasicAssemblyLine<HTMLUListElement, P> {

    public override copy(): UnorderedListAssemblyLine<P> {
        return new UnorderedListAssemblyLine(this.defaultParameters, [...this.steps]);
    }

    constructor(defaultParameters: P, steps: AssemblyLine.Step<HTMLUListElement, P>[] = []) {
        super(() => document.createElement("ul"), defaultParameters, steps);
    }

    /**
     * Adds a step that sets the bullet point type.
     * @param type value provider
     */
    public type(type: AssemblyLine.DynamicValue.Either<UnorderedListAssemblyLine.Type | string, HTMLUListElement, P>): this {
        return this.style({ listStyleType: type });
    }

}

namespace UnorderedListAssemblyLine {

    export enum Type {
        NONE = "none",
        DISC = "disc",
        CIRCLE = "circle",
        SQUARE = "square",
        DECIMAL = "decimal"
    }

}

export default UnorderedListAssemblyLine;