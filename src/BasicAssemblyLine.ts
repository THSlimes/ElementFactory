import AssemblyLine from "./AssemblyLine";
import { Primitive } from "./util-types";
import StyleMap from "./css-styling/StyleMap";

class BasicAssemblyLine<E extends HTMLElement, P extends AssemblyLine.Parameters> extends AssemblyLine<E, P> {

    public override copy(): BasicAssemblyLine<E, P> {
        return new BasicAssemblyLine(this.mold, this.defaultParameters, [...this.steps]);
    }

    /**
     * Adds a step to set the HTMLElement's id.
     * @param id provider for the id
     */
    public id(id: AssemblyLine.DynamicValue.Either<Primitive, E, P>) {
        return this.addStep((e, params) => e.id = String(AssemblyLine.DynamicValue.resolve(id, e, params)));
    }

    /**
     * Adds a step that adds classes to the HTMLElement.
     * @param classes series of class name providers. Entries that evaluate to `false` are ignored.
     */
    public classes(...classes: (AssemblyLine.DynamicValue.Either<false | string | string[], E, P>)[]) {
        return this.addStep((e, params) =>
            e.classList.add(
                ...classes
                    .map(cls => AssemblyLine.DynamicValue.resolve(cls, e, params))
                    .flat(1)
                    .filter(cls => typeof cls === "string")
            )
        );
    }

    /**
     * Adds a step that sets an attribute on the HTMLElement.
     * @param name provider for the attribute name
     * @param value provider for the attribute value. If the value evaluates to a boolean, it is used to determine the presence of the attribute.
     */
    public attribute(name: AssemblyLine.DynamicValue.Either<string, E, P>, value?: AssemblyLine.DynamicValue.Either<boolean | number | string, E, P>) {
        return this.addStep((e, params) => {
            const attrName = String(AssemblyLine.DynamicValue.resolve(name, e, params));
            const resolvedValue = value === undefined ? true : AssemblyLine.DynamicValue.resolve(value, e, params);

            if (typeof resolvedValue === "boolean") e.toggleAttribute(attrName, resolvedValue);
            else e.setAttribute(attrName, String(resolvedValue));
        });
    }

    /**
     * Adds a step that sets multiple attributes on the HTMLElement.
     * @param attributes -
     *  - For arrays, the attribute names are set without a value. Names that evaluate to `false` are ignored.
     *  - For mappings, the keys are used as attribute names and the values as attribute values. If a value evaluates to false
     * mapping of attribute names to providers for their value. values that evaluate to a boolean, are used to determine the presence of the attribute.
     */
    public attributes(attributes: AssemblyLine.DynamicValue.Either<string | string[] | false, E, P>[] | Record<string, AssemblyLine.DynamicValue.Either<boolean | number | string, E, P>>) {
        if (Array.isArray(attributes)) return this.addStep((e, params) => {
            for (const name of attributes) {
                const resolvedName = AssemblyLine.DynamicValue.resolve(name, e, params);
                if (resolvedName) [resolvedName].flat().forEach(name => e.toggleAttribute(name, true));
            }
        });
        else {
            for (const [name, val] of Object.entries(attributes)) this.attribute(name, val);

            return this;
        }
    }

    /**
     * Adds a step that sets the text of the HTMLElement.
     * @param text provider for the text
     */
    public text(text: AssemblyLine.DynamicValue.Either<Primitive, E, P>) {
        return this.addStep((e, params) => e.textContent = String(AssemblyLine.DynamicValue.resolve(text, e, params)));
    }

    /**
     * Adds a step to edit the style of the HTMLElement.
     * @param styleMap mapping of style attribute names to providers for their value
     */
    public style(styleMap: BasicAssemblyLine.ComputableStyleMap<E, P>) {
        return this.addStep((e, params) => {
            const resolvedStyleMap: StyleMap = {};
            for (const k in styleMap) {
                const propName = k as keyof StyleMap;
                resolvedStyleMap[propName] = String(AssemblyLine.DynamicValue.resolve(styleMap[propName], e, params));
            }

            StyleMap.apply(e, resolvedStyleMap);
        });
    }

    /**
     * Adds a step that enables a hover-tooltip on the HTMLElement.
     * @param text provider for the tooltip's text
     */
    public tooltip(text: AssemblyLine.DynamicValue.Either<Primitive, E, P>) {
        return this.addStep((e, params) => e.title = String(AssemblyLine.DynamicValue.resolve(text, e, params)));
    }

    /**
     * Adds a step that inserts children into the HTMLElement
     * @param children series of child providers. Providers that evaluate to `null` or `false` will be ignored.
     */
    public children(...children: AssemblyLine.DynamicValue.Either<BasicAssemblyLine.Child<P> | BasicAssemblyLine.Child<P>[], E, P>[]) {
        return this.addStep((e, params) => {
            for (const child of children) {
                const c = typeof child === "function" ? child(e, params) : child;

                e.append(
                    ...[c].flat()
                        .map(child => BasicAssemblyLine.Child.asNode(child, params))
                        .filter(child => child != null)
                );
            }
        });
    }

    /**
     * Adds a step that attaches an event handler to the HTMLElement.
     * @param type name of the event
     * @param listener callback function that is ran when the event triggers
     */
    public on<T extends keyof HTMLElementEventMap>(type: T, listener: (ev: HTMLElementEventMap[T], elem: E) => void) {
        return this.addStep(e => e.addEventListener(type, ev => listener(ev, e)));
    }

    /**
     * Adds a step that attaches a single-use event handler to the HTMLElement.
     * @param type name of the event
     * @param listener callback function that is ran once the event triggers
     */
    public once<T extends keyof HTMLElementEventMap>(type: T, listener: (ev: HTMLElementEventMap[T], elem: E) => void) {
        return this.addStep(e => e.addEventListener(type, ev => listener(ev, e), { once: true }));
    }

    /**
     * Adds a step that attaches an event listener for attribute value changes.
     * @param attrName name of the attribute
     * @param callback callback to run when the attribute's value changes
     */
    public onAttributeChanged(attrName: string, callback: (newVal: string | null, oldVal: string | null, self: E) => void) {
        return this.addStep(e =>
            new MutationObserver(mutations => {
                for (const mutation of mutations) {
                    if (mutation.type === "attributes") {
                        const newValue = e.getAttribute(attrName);
                        if (newValue !== mutation.oldValue) callback(newValue, mutation.oldValue, e);
                    }
                }
            }).observe(e, { attributes: true, attributeOldValue: true, attributeFilter: [attrName] })
        );
    }

    /**
     * Adds an arbitrary step to the BasicAssemblyLine.
     * @param funct function to run
     */
    public do(funct: (elem: E, params: P) => void) {
        return this.addStep(funct);
    }



    public static fromTagName<TN extends keyof HTMLElementTagNameMap>(tagName: TN): BasicAssemblyLine<HTMLElementTagNameMap[TN], {}>;
    public static fromTagName<TN extends keyof HTMLElementTagNameMap, P extends AssemblyLine.Parameters>(tagName: TN): BasicAssemblyLine<HTMLElementTagNameMap[TN], P>;
    public static fromTagName<TN extends keyof HTMLElementTagNameMap, P extends AssemblyLine.Parameters>(tagName: TN, defaultParameters?: P) {
        return defaultParameters === undefined ?
            new BasicAssemblyLine(() => document.createElement(tagName), {}) :
            new BasicAssemblyLine(() => document.createElement(tagName), defaultParameters);
    }

    public static custom<E extends HTMLElement, P extends AssemblyLine.Parameters, EK extends keyof E>(mold: () => E, defaultParameters: P, ...exposedKeys: EK[]): BasicAssemblyLine.Custom<E, P, EK> {
        const out = new BasicAssemblyLine(mold, defaultParameters);

        for (const k of exposedKeys) Reflect.defineProperty(out, k, {
            writable: false,
            value: (val: AssemblyLine.DynamicValue.Either<E[EK]>) => out.addStep((e, p) => e[k] = typeof val === "function" ? val(e, p) : val)
        });

        return out as BasicAssemblyLine.Custom<E, P, EK>;
    }

}

namespace BasicAssemblyLine {

    export type Child<P extends AssemblyLine.Parameters> = false | null | string | Node | AssemblyLine<any, {}>;

    export namespace Child {
        export function asNode<P extends AssemblyLine.Parameters>(child: Child<P>, params: P): Node | null {
            if (!child) return null;
            else if (typeof child === "string") return document.createTextNode(child);
            else if (child instanceof AssemblyLine) return child.make({});
            else return child;
        }
    }


    export type ComputableStyleMap<E extends HTMLElement, P extends AssemblyLine.Parameters> = Partial<Record<keyof StyleMap, AssemblyLine.DynamicValue.Either<Primitive, E, P>>>;

    export type Custom<E extends HTMLElement, P extends AssemblyLine.Parameters, EK extends keyof E> = BasicAssemblyLine<E, P> & {
        [K in EK]: (val: AssemblyLine.DynamicValue.Either<E[K], E, P>) => Custom<E, P, EK>
    };

}

export default BasicAssemblyLine;