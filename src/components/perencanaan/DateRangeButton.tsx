import { useState, useRef, useEffect } from 'react';
import {
    DateRangePicker,
    Range,
    RangeKeyDict,
    createStaticRanges,
} from 'react-date-range';
import {
    addDays,
    startOfMonth,
    endOfMonth,
    subMonths,
    startOfDay,
    endOfDay,
    format,
    startOfYear,
} from 'date-fns';
import { id } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FaRegCalendar, FaTimes } from 'react-icons/fa';

// Custom static ranges (opsional, jika ingin tombol cepat)
const customStaticRanges = createStaticRanges([
    {
        label: 'Hari ini',
        range: () => ({
            startDate: startOfDay(new Date()),
            endDate: endOfDay(new Date()),
        }),
    },
    {
        label: 'Kemarin',
        range: () => {
            const yesterday = addDays(new Date(), -1);
            return {
                startDate: startOfDay(yesterday),
                endDate: endOfDay(yesterday),
            };
        },
    },
    {
        label: '7 hari terakhir',
        range: () => ({
            startDate: addDays(new Date(), -6),
            endDate: new Date(),
        }),
    },
    {
        label: '30 hari terakhir',
        range: () => ({
            startDate: addDays(new Date(), -29),
            endDate: new Date(),
        }),
    },
    {
        label: 'Bulan ini',
        range: () => ({
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
        }),
    },
    {
        label: 'Bulan kemarin',
        range: () => {
            const prevMonth = subMonths(new Date(), 1);
            return {
                startDate: startOfMonth(prevMonth),
                endDate: endOfMonth(prevMonth),
            };
        },
    },
    {
        label: 'Semua',
        range: () => ({
            startDate: new Date(2000, 0, 1), // bisa sesuaikan default paling awal
            endDate: new Date(),
        }),
    },
]);

interface DateRangeButtonProps {
    onChange?: (range: Range | null) => void;
}

export default function DateRangeButton({ onChange }: DateRangeButtonProps) {
    const [showPicker, setShowPicker] = useState(false);
    const [range, setRange] = useState<Range>({
        startDate: startOfYear(new Date()),
        endDate: endOfDay(new Date()),
        key: 'selection',
    });

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setShowPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (rangesByKey: RangeKeyDict) => {
        const selection = rangesByKey.selection;
        setRange(selection);
        onChange?.(selection);
    };

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation(); // cegah toggle dropdown
        const resetValue: Range = {
            startDate: undefined,
            endDate: undefined,
            key: 'selection',
        };
        setRange(resetValue);
        onChange?.(null);
        setShowPicker(false);
    };

    const getLabel = () => {
        if (range.startDate && range.endDate) {
            return `${format(range.startDate, 'dd MMM yyyy', {
                locale: id,
            })} - ${format(range.endDate, 'dd MMM yyyy', { locale: id })}`;
        }
        if (range.startDate) {
            return `${format(range.startDate, 'dd MMM yyyy', { locale: id })}`;
        }
        return 'Pilih rentang waktu';
    };

    return (
        <div className="relative w-1/4" ref={ref}>
            {/* Trigger Button */}
            <button
                onClick={() => setShowPicker(!showPicker)}
                className="relative border-2 border-neutral-500 rounded text-neutral-600 w-full text-left outline-none pl-2 pr-8 py-2"
            >
                {getLabel()}

                {/* Icon (Clear / Calendar) */}
                {range.startDate && range.endDate ? (
                    <FaTimes
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-red-500"
                        size={14}
                        onClick={handleReset}
                    />
                ) : (
                    <FaRegCalendar
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        size={14}
                    />
                )}
            </button>

            {/* Date Range Picker Dropdown */}
            {showPicker && (
                <div className="absolute right-0 mt-2 z-50 shadow-lg bg-white border-2 border-neutral-500 rounded">
                    <div className="flex justify-end p-2 border-b">
                        <button
                            onClick={(e) => handleReset(e)}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Reset
                        </button>
                    </div>
                    <DateRangePicker
                        editableDateInputs
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={[range]}
                        months={1}
                        direction="horizontal"
                        dateDisplayFormat="dd MMM yyyy"
                        locale={id} // untuk format tanggal Indo
                        staticRanges={customStaticRanges} // label Indo
                        inputRanges={[]}
                    />
                </div>
            )}
        </div>
    );
}
