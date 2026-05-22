"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function GenerateButton({
    size,
    disabled,
    isSubmitting,
    onSubmit,
    className,
} : {
    size?: "default" | "sm",
    disabled: boolean,
    isSubmitting: boolean,
    onSubmit: () => void,
    className?: string
}) {
    return (
        <Button
        size={size}
        className={className}
        onClick={onSubmit}
        disabled={disabled}
    >
        {isSubmitting ? (
            <>
                <Loader2 className="animate-spin" />
                Generating...
            </>
        ) : (
            "Generate speech"
        )}
    </Button>
    )
}