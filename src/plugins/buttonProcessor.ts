/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * License https://xdsoft.net/jodit/license.html
 * Copyright 2013-2018 Valeriy Chupurnov https://xdsoft.net
 */

import {Jodit} from '../Jodit';
import {$$, debounce} from "../modules/Helpers";

const JODIT_BUTTON_PROCESSOR_BINDED = '__jodit_buttonprocessor_binded';

/**
 * Change editor's size after load all images
 *
 * @param {Jodit} editor
 */
export function buttonProcessor(editor: Jodit) {
    editor.events.on('change afterInit', debounce(() => {
        if (editor.editor) {
            $$('a', editor.editor).forEach((elm: HTMLElement) => {
                if (!(<any>elm)[JODIT_BUTTON_PROCESSOR_BINDED]) {
                    (<any>elm)[JODIT_BUTTON_PROCESSOR_BINDED] = true;
                    if (!(<HTMLImageElement>elm).complete) {
                        elm.addEventListener('load', function ElementOnLoad() {
                            editor.events && editor.events.fire && editor.events.fire('resize');
                            elm.removeEventListener('load', ElementOnLoad);
                        });
                    }
                    editor.events.on(elm, 'mousedown touchstart', () => {
                        editor.selection.select(elm);
                    });
                }
            });
        }
    }, editor.defaultTimeout));
}