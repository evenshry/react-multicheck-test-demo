import './MultiCheck.css';

import React, { useMemo } from 'react';

import Utils, { Sequence } from './utils';

export type Option = {
  label: string;
  value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string;
  options: Option[];
  columns?: number;
  values?: string[];
  onChange?: (options: Option[]) => void;
};

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { label = 'MultiCheck', options = [], columns = 1, values = [], onChange } = props;

  const sequences: Sequence[] = useMemo(() => {
    if (options.length && columns) {
      return Utils.getSequences(options.length, columns);
    } else {
      return [];
    }
  }, [options.length, columns]);

  const checkAll: boolean = useMemo(() => {
    // If every option is checked, then checkAll is checked, otherwise checkAll is unchecked
    return options.every((item) => values.includes(item.value));
  }, [values.length]);

  const handleCheckAll = (checked: boolean): void => {
    // check all options or none option
    onChange && onChange(checked ? [...options] : []);
  };

  const handleCheckItem = (value: string, checked: boolean): void => {
    const tempValues = [...values];
    if (checked) {
      // add value to values
      tempValues.push(value);
    } else {
      // remove value from values
      const removeIndex: number = tempValues.findIndex((v) => v === value);
      tempValues.splice(removeIndex, 1);
    }
    // collect options from values
    const items: Option[] = options.filter((item) => tempValues.includes(item.value));
    onChange && onChange(items);
  };

  return (
    <div className="MultiCheck">
      <div className="MultiCheck_Title">{label}</div>
      <div className="MultiCheck_Content">
        <div className="MultiCheck_Panel">
          {sequences.map((column, columnIndex) => (
            <ul className="MultiCheck_Column" key={`column_${columnIndex}`}>
              {columnIndex === 0 && (
                <li className="MultiCheck_Column_Item">
                  <label className="MultiCheck_Column_Label">
                    <input
                      type="checkbox"
                      checked={checkAll}
                      className="MultiCheck_Column_Check"
                      onChange={() => handleCheckAll(!checkAll)}
                    />
                    Select All
                  </label>
                </li>
              )}
              {options.slice(column.start, column.end).map((item, index) => {
                const checked: boolean = values.includes(item.value);
                return (
                  <li className="MultiCheck_Column_Item" key={`item_${index}`}>
                    <label className="MultiCheck_Column_Label">
                      <input
                        type="checkbox"
                        className="MultiCheck_Column_Check"
                        checked={checked}
                        onChange={() => handleCheckItem(item.value, !checked)}
                      />
                      {item.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiCheck;
